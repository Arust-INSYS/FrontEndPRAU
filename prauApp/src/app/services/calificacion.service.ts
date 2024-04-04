import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service'; // Importa localStorageService
import { entorno } from '../env/entorno';
import { Calificacion } from '../models/calificacion';

@Injectable({
  providedIn: 'root',
})
export class CalificacionService  {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  private url: string = `${entorno.urlPrivada}/calificacion`;
  //private token = this.localStorage.getItem('token');

  crearCalificacion(calificacion: Calificacion): Observable<Calificacion> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Calificacion>(`${this.url}/create`, calificacion, { headers });
  }

  update(id: number, calificacion: Calificacion): Observable<Calificacion> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<Calificacion>(`${this.url}/update?id=${id}`, calificacion, { headers });
  }

  delete(id: number): Observable<any> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });
    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.delete(`${this.url}/delete?id=${id}`, { headers });
  }


  listarCalificaciones(): Observable<Calificacion[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get(this.url + '/read').pipe(map((response) => response as Calificacion[]));
  }
  
  verificarIdUnico(id: number): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get<boolean>(`${this.url}/idUnico?id=${id}`, { headers });
  }
}
