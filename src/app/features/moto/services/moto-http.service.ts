import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MotoDto } from '../dtos';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotoHttpService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Gets the complete list of motorcycles
   * Endpoint: GET /motos
   */
  index(): Observable<MotoDto[]> {

    const url = `${this.baseUrl}motos`;
    
    return this.http.get<MotoDto[]>(url).pipe(
      catchError((error) => {
        this.handleError(error, 'Error getting motorcycle list');
        return of([]);

      })
    );
  }

  /**
   * Gets the detail of a specific motorcycle
   * Endpoint: GET /moto/:id
   */
  detail(id: string): Observable<MotoDto | null> {
    if (!id) {
      throw new Error('Motorcycle ID is required');
    }

    const url = `${this.baseUrl}motos/${id}`;

    return this.http.get<MotoDto>(url).pipe(
      catchError((error) => {
        this.handleError(error, `Error getting motorcycle detail with ID: ${id}`);
        return of(null);
      })
    );
  }

  /**
   * Handles HTTP request errors
   */
  private handleError(error: any, customMessage: string): void {
    console.error(customMessage, error);

    if (error instanceof HttpErrorResponse) {
      // HTTP server error
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        console.error('Client error:', error.error.message);
      } else {
        // Server-side error
        console.error(
          `Server error code: ${error.status}\n` +
          `Message: ${error.message}`
        );
      }
    } else {
      // JavaScript or application error
      console.error('Application error:', error.message || error);
    }
  }
}
