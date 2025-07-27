import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, switchMap } from 'rxjs';

import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { AppointmentModalService } from '../../services/appointment-modal.service';

@Component({
  selector: 'app-detail-moto',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, AppointmentModalComponent],
  templateUrl: './detail-moto.component.html',
  styleUrl: './detail-moto.component.scss'
})
export class DetailMotoComponent implements OnInit {

    isLoading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private appointmentModalService: AppointmentModalService
    ) {}

    ngOnInit(): void {
        this.isLoading = false;
    }

    goBack(): void {
        this.router.navigate(['/motos']);
    }

  openAppointmentModal(): void {
    this.appointmentModalService.openModal('¿Deseas agendar una cita para ver esta moto?');
  }
}
