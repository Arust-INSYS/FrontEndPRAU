import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { entorno } from '../env/entorno';
import { PeriodoAc } from '../models/periodoAc';
import { Observable, catchError, map } from 'rxjs';
import { GraficaPeriodoAc } from '../models/GraficaPeriodoAc';

@Injectable({
  providedIn: 'root',
})
export class PeriodoAcService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  private url: string = `${entorno.urlPrivada}/PeriodoAc`;

  getPeriodosAcs(): Observable<PeriodoAc[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http
      .get(this.url + '/read', { headers }) // Include headers in the request
      .pipe(map((response) => response as PeriodoAc[]));
  }

  registrarPeriodoAc(periodoAc: PeriodoAc): Observable<PeriodoAc> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<PeriodoAc>(`${this.url}/create`, periodoAc, {
      headers,
    });
  }

  getPeriodoAcById(id: number): Observable<PeriodoAc> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<PeriodoAc>(`${this.url}/find/${id}`, { headers });
  }

  update(id: number, periodo: PeriodoAc): Observable<PeriodoAc> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<PeriodoAc>(`${this.url}/update?id=${id}`, periodo, {
      headers,
    });
  }
  obtenerListaPeriodoAc(): Observable<PeriodoAc[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`
    });
  
    const options = { headers: headers };

    return this.http.get<PeriodoAc[]>(this.url + '/read', options).pipe(
      catchError(error => {
        console.error('Error obteniendo periodo Ac:', error);
        throw error;
      })
    );
  }
  eliminarPeriodoAc(id: number): Observable<void> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.delete<void>(`${this.url}/delete?id=${id}`, {
      headers,
    });
  }
  obtenerGraficaPeriodoAc(periodoId: number): Observable<GraficaPeriodoAc[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`
    });

    const params = new HttpParams()
      .set('periodoId', periodoId.toString());

    return this.http.get<GraficaPeriodoAc[]>(`${this.url}/graficaPeriodoAC`, { headers, params });
  }
}
