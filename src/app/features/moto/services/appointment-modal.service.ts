import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentModalService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  private messageSubject = new BehaviorSubject<string>('');

  isOpen$ = this.isOpenSubject.asObservable();
  message$ = this.messageSubject.asObservable();

  openModal() {
    this.isOpenSubject.next(true);
  }

  closeModal() {
    this.isOpenSubject.next(false);
  }
}
