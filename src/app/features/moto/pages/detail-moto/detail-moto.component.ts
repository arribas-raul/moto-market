import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';

import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { AppointmentModalService } from '../../services/appointment-modal.service';
import { MotoHttpService } from '../../services/moto-http.service';
import { MotoDto } from '../../dtos';

@Component({
  selector: 'app-detail-moto',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, AppointmentModalComponent],
  templateUrl: './detail-moto.component.html',
  styleUrl: './detail-moto.component.scss'
})
export class DetailMotoComponent implements OnInit, OnDestroy {

    isLoading = false;
    private destroy$ = new Subject<void>();

    moto: MotoDto = { id : '' };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private appointmentModalService: AppointmentModalService,
        private motoHttpService: MotoHttpService
    ) {}

    ngOnInit(): void {
        this.getUrlParams();
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

                        this.moto.precioReventa = this.calculateRebuyValue() // Default to 0 if not provided
                        console.log('Moto cargada:', moto);
                        // Success is handled automatically by the service
                    } else {
                        console.error('Moto no encontrada');
                        // Error toast already shown by GlobalErrorService
                    }
                },
                error: (error) => {
                    console.error('Error al cargar la moto:', error);
                    // Error toast already shown by GlobalErrorService
                },
                complete: () => {
                    this.isLoading = false;
                }
            });
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





    goBack(): void {
        this.router.navigate(['/motos']);
    }

    openAppointmentModal(): void {
        this.appointmentModalService.openModal('¿Deseas agendar una cita para ver esta moto?');
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
