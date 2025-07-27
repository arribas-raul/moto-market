import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AppointmentModalService } from '../../services/appointment-modal.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-appointment-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './appointment-modal.component.html',
  styleUrl: './appointment-modal.component.scss'
})
export class AppointmentModalComponent implements OnInit, OnDestroy {
  isOpen = false;
  message = '';
  private destroy$ = new Subject<void>();

  constructor(private modalService: AppointmentModalService) {}

  ngOnInit() {
    this.modalService.isOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isOpen => this.isOpen = isOpen);

    this.modalService.message$
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => this.message = message);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  acceptModal() {
    
    this.modalService.closeModal();
  }
}
