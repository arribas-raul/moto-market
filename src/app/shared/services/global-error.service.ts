import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../features/moto/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService {

  constructor(private toastService: ToastService) {}

  /**
   * Handles HTTP errors globally and shows appropriate toast messages
   */
  handleHttpError(error: any, customMessage?: string): void {
    console.error('HTTP Error:', error);

    let errorMessage = customMessage || 'toast.not_found';

    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 404:
          errorMessage = 'toast.not_found';
          break;
        case 400:
          errorMessage = 'toast.bad_request';
          break;
        case 401:
          errorMessage = 'toast.unauthorized';
          break;
        case 403:
          errorMessage = 'toast.forbidden';
          break;
        case 500:
          errorMessage = 'toast.server_error';
          break;
        case 0:
          errorMessage = 'toast.connection_error';
          break;
        default:
          errorMessage = 'toast.unknown_error';
      }
    }

    this.toastService.showError(errorMessage);
  }

  /**
   * Handles general application errors
   */
  handleAppError(error: any, customMessage?: string): void {
    console.error('Application Error:', error);
    const errorMessage = customMessage || 'TOAST.UNKNOWN_ERROR';
    this.toastService.showError(errorMessage);
  }
}
