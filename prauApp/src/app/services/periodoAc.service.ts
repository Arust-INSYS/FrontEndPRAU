import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PeriodoAc } from '../models/periodoAc';
import { entorno } from '../env/entorno';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodoAcService {
  private apiUrl: string = entorno.urlPrivada + '/PeriodoAc';

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  cargarPeriodosAcademicos(): Observable<PeriodoAc[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`
    });
  
    const options = { headers: headers };

    return this.http.get<PeriodoAc[]>(this.apiUrl + '/read', options).pipe(
      catchError(error => {
        console.error('Error obteniendo lista de periodos académicos:', error);
        throw error;
      })
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}
