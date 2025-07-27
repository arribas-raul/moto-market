import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MotoDto } from '../dtos';
import { catchError, Observable, of } from 'rxjs';
import { GlobalErrorService } from '../../../shared/services/global-error.service';

@Injectable({
  providedIn: 'root'
})
export class MotoHttpService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private globalErrorService: GlobalErrorService
  ) {}

  /**
   * Gets the complete list of motorcycles
   * Endpoint: GET /motos
   */
  index(): Observable<MotoDto[]> {

    const url = `${this.baseUrl}motos`;
    
    return this.http.get<MotoDto[]>(url).pipe(
      catchError((error) => {
        this.globalErrorService.handleHttpError(error);
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
        this.globalErrorService.handleHttpError(error);
        return of(null);
      })
    );
  }
}
