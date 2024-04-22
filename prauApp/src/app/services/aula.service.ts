import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { entorno } from '../env/entorno';
import { Observable, map } from 'rxjs';
import { Aula } from '../models/aula';
import { IConsultarAula, IConsultarAulaObj } from '../interface/IConsultasBD';
import { graficaAula } from '../models/graficaAula';
import { graficaCiclo } from '../models/graficaCiclo';
import { graficaResumenCiclo } from '../models/graficaResumenCiclo';

@Injectable({
  providedIn: 'root',
})
export class AulaService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  private url: string = `${entorno.urlPrivada}/aula`;

  getAulas(): Observable<Aula[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http
      .get(this.url + '/read', { headers }) // Include headers in the request
      .pipe(map((response) => response as Aula[]));
  }

  getAulasPorUsuario(userId: number): Observable<Aula[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get<Aula[]>(`${this.url}/findAulaByUserId/${userId}`, { headers });
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
  eliminarAula(id: number): Observable<void> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.delete<void>(`${this.url}/delete?id=${id}`, {
      headers,
    });
  }


  getAulaById(id: number): Observable<Aula> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Aula>(`${this.url}/find/${id}`, { headers });
  }

  aulaConsultar(asignaturaId: number, carreraId: number, periodoId: number, usuId: number): Observable<IConsultarAula[]> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
    return this.http.get<IConsultarAula[]>(`${this.url}/aulaConsultar?asignaturaId=${asignaturaId}&carreraId=${carreraId}&periodoId=${periodoId}&usuId=${usuId}`, {
      headers,
    });

  }

  graficaCiclo(carreraId: number, periodoId: number): Observable<graficaCiclo[]> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
    return this.http.get<graficaCiclo[]>(`${this.url}/graficaCiclo?carreraId=${carreraId}&periodoId=${periodoId}`, {
      headers,
    });

  }

  resumenGraficoCiclo(carreraId: number, periodoId: number): Observable<graficaResumenCiclo[]> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
    return this.http.get<graficaResumenCiclo[]>(`${this.url}/resumenGraficoCiclo?carreraId=${carreraId}&periodoId=${periodoId}`, {
      headers,
    });

  }
  aulaFindById(aulaId: number): Observable<Aula> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
    return this.http.get<Aula>(`${this.url}/aulaFindById?aulaId=${aulaId}`, {
      headers,
    });

  }

  graficaAula(aulaId:number,docenteId: number,asignaturaId:number,carreraId:number,periodoId:number):Observable<graficaAula[]>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
    return this.http.get<graficaAula []>(`${this.url}/graficaAula?aulaId=${aulaId}&docenteId=${docenteId}&asignaturaId=${asignaturaId}&carreraId=${carreraId}&periodoId=${periodoId}`, {
      headers,
    });
  }

}
