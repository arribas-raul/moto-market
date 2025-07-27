import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  message: string;
  type: 'error';
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage>({
    message: '',
    type: 'error',
    visible: false
  });

  toast$ = this.toastSubject.asObservable();

  showError(message: string = 'TOAST.NOT_FOUND') {
    this.toastSubject.next({
      message,
      type: 'error',
      visible: true
    });
    this.autoHide();
  }

  hide() {
    this.toastSubject.next({
      ...this.toastSubject.value,
      visible: false
    });
  }

  private autoHide() {
    setTimeout(() => {
      this.hide();
    }, 4000); // Hide after 4 seconds
  }
}
