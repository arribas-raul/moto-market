import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';

import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { AppointmentModalService } from '../../services/appointment-modal.service';
import { MotoHttpService } from '../../services/moto-http.service';
import { MotoDto } from '../../dtos';

@Component({
  selector: 'app-detail-moto',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, AppointmentModalComponent, LeafletModule],
  templateUrl: './detail-moto.component.html',
  styleUrl: './detail-moto.component.scss'
})
export class DetailMotoComponent implements OnInit, AfterViewInit, OnDestroy {

    isLoading = false;
    showTooltip = false;
    private destroy$ = new Subject<void>();

    moto: MotoDto = { id : '' };

    // Map properties
    mapOptions: L.MapOptions = {
        layers: [
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '© OpenStreetMap contributors'
            })
        ],
        zoom: 15,
        center: L.latLng(40.4168, -3.7038) // Default center (Madrid)
    };
    mapLayers: L.Layer[] = [];
    mapReady = false;

    private langChangeSub: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private appointmentModalService: AppointmentModalService,
        private motoHttpService: MotoHttpService,
        private translate: TranslateService
    ) {}

    ngOnInit(): void {
        this.getUrlParams();
        this.langChangeSub = this.translate.onLangChange.subscribe(() => {
            this.getUrlParams();
        });
    }

    ngAfterViewInit(): void {
    }
    
    private getUrlParams(): void {
        this.route.paramMap
            .pipe(takeUntil(this.destroy$))
            .subscribe(params => {
                const id = params.get('id');

                if (id) {
                    this.moto.id = id;
                    this.getDataMoto();
                } else {
                    console.error('ID de moto no encontrado en la URL');
                }
            });
    }
    private getDataMoto(): void {
        if (!this.moto.id) {
            console.error('ID de moto no válido');
            this.isLoading = false;
            return;
        }

        this.isLoading = true;
        
        this.motoHttpService.detail(this.moto.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (moto: MotoDto | null) => {
                    if (moto) {
                        this.moto = { ...moto };

                        this.moto.precioReventa = this.calculateRebuyValue() 
                        
                        this.updateMapLocation();
                        
                    } else {
                        console.error('Moto no encontrada');
                    }
                },
                error: (error) => {
                    console.error('Error al cargar la moto:', error);
                },
                complete: () => {
                    this.isLoading = false;
                }
            });
    }

    private updateMapLocation(): void {
        if (this.moto.coordenadas) {
            const { latitud, longitud } = this.moto.coordenadas;
            
            // Update map center
            this.mapOptions = {
                ...this.mapOptions,
                center: L.latLng(latitud, longitud)
            };

            // Create marker for motorcycle location
            const motorcycleIcon = L.icon({
                iconUrl: 'assets/images/icon_map.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });

            const marker = L.marker([latitud, longitud], { icon: motorcycleIcon })
                .bindPopup(`<strong>${this.moto.nombre}</strong><br>${this.moto.modelo}`);

            this.mapLayers = [marker];
            this.mapReady = true;
        }
    }

    private calculateRebuyValue(): number {
        if(this.moto.precioCompra === undefined) return 0;

        const now = new Date();

        const datePurchase = new Date(this.moto.fechaCompra!);

        let years = now.getFullYear() - datePurchase!.getFullYear();

        const monthDiff = now.getMonth() - datePurchase.getMonth();
        const dayDiff = now.getDate() - datePurchase.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            years--;
        }
        if (years < 0) {
            years = 0;
        }

        const currentValue = this.moto.precioCompra / Math.pow(2, years);

        return currentValue;
    }

    onMapReady(map: L.Map): void {
        console.log('Map ready:', map);
    }

    goBack(): void {
        this.router.navigate(['/motos']);
    }

    openAppointmentModal(): void {
        this.appointmentModalService.openModal();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.langChangeSub) {
            this.langChangeSub.unsubscribe();
        }
    }
}
