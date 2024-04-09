import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Calificacion } from '../models/calificacion';
import { Observable, catchError } from 'rxjs';
import { entorno } from '../env/entorno';

@Injectable({
  providedIn: 'root',
})
export class CalificacionService {
  private url: string = `${entorno.urlPrivada}/calificacion`;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  /*obtenerListacriterios(): Observable<Criterios[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`
    });

    const options = { headers: headers };

    return this.http.get<Criterios[]>(this.url + '/read', options);
  }*/
  obtenerListacriterios(): Observable<Calificacion[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`,
    });

    const options = { headers: headers };

    return this.http.get<Calificacion[]>(this.url + '/read', options).pipe(
      catchError((error) => {
        console.error('Error obteniendo lista de criterios:', error);
        throw error;
      })
    );
  }

  eliminarcriterios(codCalificacion: string): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP DELETE con el encabezado de autorización
    return this.http.delete(
      `${this.url}/delete?codCalificacion=${codCalificacion}`,
      { headers }
    );
  }

  actualizarcriterios(
    codCalificacion: string,
    calificacion: Calificacion
  ): Observable<Calificacion> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`,
    });

    // Aquí agregamos el código de calificación a la URL
    return this.http.put<Calificacion>(
      `${this.url}/update?codCalificacion=${codCalificacion}`,
      calificacion,
      { headers }
    );
  }

  registrarcriterios(calificacion: Calificacion): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Calificacion>(`${this.url}/create`, calificacion, {
      headers,
    });
  }

  obtenerCriterioPorId(calificacionId: string): Observable<Calificacion> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
    return this.http.get<Calificacion>(`${this.url}/buscar?id=${calificacionId}`,{
      headers,
    });
}

  cedulaUnica(ci: string) {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP GET con el encabezado de autorización
    return this.http.get<boolean>(`${this.url}/cedulaUnica?ci=${ci}`, {
      headers,
    });
  }
}
