import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Carrera } from '../models/carrera';
import { entorno } from '../env/entorno';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private apiUrl: string = entorno.urlPrivada + '/carrera';

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  // Método para cargar la lista de carreras desde el backend
  cargarCarreras(): Observable<Carrera[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`
    });
  
    const options = { headers: headers };

    return this.http.get<Carrera[]>(this.apiUrl + '/read', options).pipe(
      catchError(error => {
        console.error('Error obteniendo lista de carreras:', error);
        throw error;
      })
    );
  }

  // Manejar errores de la solicitud HTTP
  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}