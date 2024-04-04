import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service'; // Importa localStorageService
import { entorno } from '../env/entorno';
import { Carrera } from '../models/carrera';

@Injectable({
  providedIn: 'root',
})
export class CarreraService  {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  private url: string = `${entorno.urlPrivada}/carrera`;
  //private token = this.localStorage.getItem('token');

  crearCarrera(carrera: Carrera): Observable<Carrera> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });
    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Carrera>(`${this.url}/create`, carrera, { headers });
  }

  verificarExistenciaCarrera(nombreCarrera: string): Observable<boolean> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });
    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<boolean>(`${this.url}/${nombreCarrera}`, { headers });
  }

  update(id: number, carrera: Carrera): Observable<Carrera> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });
    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<Carrera>(`${this.url}/update?id=${id}`, carrera, { headers });
  }

  delete(id: number): Observable<any> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });
    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.delete(`${this.url}/delete?id=${id}`, { headers });
  }


  listarCarrera(): Observable<Carrera[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get(this.url + '/read').pipe(map((response) => response as Carrera[]));
  }
  
}
