import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service'; // Importa localStorageService
import { EvaluacionDet } from '../models/evaluacionDet';
import { entorno } from '../env/entorno';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionDetService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }
  private url: string = `${entorno.urlPrivada}/evaluacionDet`;
  //private token = this.localStorage.getItem('token');

  CrearEvaluacionDET(evaluacionDet: EvaluacionDet): Observable<EvaluacionDet> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<EvaluacionDet>(`${this.url}/create`, evaluacionDet, { headers });
  }

  createList(detalle: EvaluacionDet[]): Observable<EvaluacionDet[]> {
    console.log(detalle)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`,
    });

    return this.http.post<EvaluacionDet[]>(`${this.url}/detalleEva`, detalle, { headers });
  }

  update(id: number, evaluacionDet: EvaluacionDet): Observable<EvaluacionDet> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<EvaluacionDet>(`${this.url}/update?id=${id}`, evaluacionDet, { headers });
  }

  delete(id: number): Observable<any> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });
    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.delete(`${this.url}/delete?id=${id}`, { headers });
  }


  getEvaluacionDET(): Observable<EvaluacionDet[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get(this.url + '/read').pipe(map((response) => response as EvaluacionDet[]));
  }

  updateList(evaluacionDets: EvaluacionDet[]): Observable<EvaluacionDet[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`,
    });

    return this.http.put<EvaluacionDet[]>(`${this.url}/updateList`, evaluacionDets, { headers });
  }
//Busca al detalle
  detalleEvaluacion(nroEvaluacion: number): Observable<EvaluacionDet[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`
    });

    return this.http.get<EvaluacionDet[]>(`${this.url}/detalleEvaluacion?nroEvaluacion=${nroEvaluacion}`, { headers });
  }


}
