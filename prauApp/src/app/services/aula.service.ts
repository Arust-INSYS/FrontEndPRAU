import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service'; // Importa localStorageService
import { entorno } from '../env/entorno';
import { Aula } from '../models/aula';

@Injectable({
  providedIn: 'root',
})
export class AulaService  {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  private url: string = `${entorno.urlPrivada}/aula`;
  //private token = this.localStorage.getItem('token');

  crearAula(aula: Aula): Observable<Aula> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });
    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Aula>(`${this.url}/create`, aula, { headers });
  }

  update(id: number, aula: Aula): Observable<Aula> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });
    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<Aula>(`${this.url}/update?id=${id}`, aula, { headers });
  }

  delete(id: number): Observable<any> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });
    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.delete(`${this.url}/delete?id=${id}`, { headers });
  }


  listarAula(): Observable<Aula[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get(this.url + '/read').pipe(map((response) => response as Aula[]));
  }

  verificarIdUnico(id: number): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get<boolean>(`${this.url}/idUnico?id=${id}`, { headers });
  }
  
}
