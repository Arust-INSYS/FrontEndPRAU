import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { entorno } from '../env/entorno';
import { Observable, map } from 'rxjs';
import { Aula } from '../models/aula';

@Injectable({
  providedIn: 'root',
})
export class AulaService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  private url: string = `${entorno.urlPrivada}/aula`;

  getAulas(): Observable<Aula[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http
      .get(this.url + '/read', { headers }) // Include headers in the request
      .pipe(map((response) => response as Aula[]));
  }

  registrarPeriodoAc(aula: Aula): Observable<Aula> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Aula>(`${this.url}/create`, aula, { headers });
  }

  update(id: number, persona: Aula): Observable<Aula> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<Aula>(`${this.url}/update?id=${id}`, persona, {
      headers,
    });
  }
}
