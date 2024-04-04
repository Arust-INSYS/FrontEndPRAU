import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service'; // Importa localStorageService
import { EvaluacionCab } from '../models/evaluacionCab';
import { entorno } from '../env/entorno';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionCabService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  private url: string = `${entorno.urlPrivada}/evaluacionCab`;
  //private token = this.localStorage.getItem('token');

  CrearEvaluacionCab(evaluacionCab: EvaluacionCab): Observable<EvaluacionCab> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<EvaluacionCab>(`${this.url}/create`, evaluacionCab, { headers });
  }

  update(id: number, evaluacionCab: EvaluacionCab): Observable<EvaluacionCab> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<EvaluacionCab>(`${this.url}/update?id=${id}`, evaluacionCab, { headers });
  }

  delete(id: number): Observable<any> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });
    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.delete(`${this.url}/delete?id=${id}`, { headers });
  }


  getEvaluacionCAB(): Observable<EvaluacionCab[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get(this.url + '/read').pipe(map((response) => response as EvaluacionCab[]));
  }
}