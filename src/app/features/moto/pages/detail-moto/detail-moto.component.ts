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

    motoDto: MotoDto = { id : '' };

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
                    this.motoDto.id = id;
                    this.getDataMoto();
                } else {
                    console.error('ID de moto no encontrado en la URL');
                }
            });
    }
    private getDataMoto(): void {
        if (!this.motoDto.id) {
            console.error('ID de moto no válido');
            this.isLoading = false;
            return;
        }

        this.isLoading = true;
        
        this.motoHttpService.detail(this.motoDto.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (moto: MotoDto | null) => {
                    if (moto) {
                        this.motoDto = { ...moto };
                        console.log('Moto cargada:', moto);
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
