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

    let errorMessage = customMessage || 'TOAST.NOT_FOUND';

    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 404:
          errorMessage = 'TOAST.NOT_FOUND';
          break;
        case 400:
          errorMessage = 'TOAST.BAD_REQUEST';
          break;
        case 401:
          errorMessage = 'TOAST.UNAUTHORIZED';
          break;
        case 403:
          errorMessage = 'TOAST.FORBIDDEN';
          break;
        case 500:
          errorMessage = 'TOAST.SERVER_ERROR';
          break;
        case 0:
          errorMessage = 'TOAST.CONNECTION_ERROR';
          break;
        default:
          errorMessage = 'TOAST.UNKNOWN_ERROR';
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
