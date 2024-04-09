import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Carrera } from '../models/carrera';
import { entorno } from '../env/entorno';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CarreraService {
  private url: string = `${entorno.urlPrivada}/carrera`;
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  /*obtenerListaCarreras(): Observable<Carrera[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`,
    });

    const options = { headers: headers };

    return this.http.get<Carrera[]>(this.url + '/read', options).pipe(
      catchError((error) => {
        console.error('Error obteniendo lista de carreras:', error);
        throw error;
      })
    );
  }*/
  cargarCarrera(): Observable<Carrera[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const options = { headers: headers };

    return this.http
      .get<Carrera[]>(this.url + '/read', options)
      .pipe(catchError(this.handleError));
  }
  eliminarcarrera(id: number): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP DELETE con el encabezado de autorización
    return this.http.delete(`${this.url}/delete?id=${id}`, { headers });
  }

  actualizarcarrera(id: number, carrera: Carrera): Observable<Carrera> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http
      .put<Carrera>(`${this.url}/update?id=${id}`, carrera, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error actualizando carreras:', error);
          throw error; // Puedes manejar el error aquí o lanzarlo para que lo manejen desde el componente
        })
      );
  }
  registrarcarreras(carrera: Carrera): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Carrera>(`${this.url}/create`, carrera, { headers });
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }

  obtenerCarreraPorId(id: number): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.url}/buscar?id=${id}`);
  }

  obtenerListaCarreras(): Observable<Carrera[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`,
    });

    return this.http.get<Carrera[]>(this.url + '/read', { headers }).pipe(
      catchError((error) => {
        console.error('Error obteniendo lista de carreras:', error);
        throw error;
      })
    );
  }

  
}
