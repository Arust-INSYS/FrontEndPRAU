import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { entorno } from '../env/entorno';
import { catchError } from 'rxjs/operators';
import { Asignatura } from '../models/asignatura';
import { IAsignaturaXCarrera } from '../interface/IConsultasBD';
import { graficaAsignatura } from '../models/graficaAsignatura';
import { GraficaAsignaturaCiclo } from '../models/GraficaAsignaturaPorCiclo';
@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  private url: string = `${entorno.urlPrivada}/asignatura`

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  obtenerListaAsignaturas(): Observable<Asignatura[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`
    });

    const options = { headers: headers };

    return this.http.get<Asignatura[]>(this.url + '/read', options ).pipe(
      catchError(error => {
        console.error('Error obteniendo lista de asignaturas:', error);
        throw error;
      })
    
    );
    
  }

  eliminarAsignatura(id: number): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP DELETE con el encabezado de autorización
    return this.http.delete(`${this.url}/delete?id=${id}`, { headers });
  }


  actualizarasignatura(id: number, asignatura: Asignatura): Observable<Asignatura> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<Asignatura>(`${this.url}/update?id=${id}`, asignatura, { headers }).pipe(
      catchError(error => {
        console.error('Error actualizando asignatura:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que lo manejen desde el componente
      })
    );
  }
  registrarasignaturas(asignatura: Asignatura): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Asignatura>(`${this.url}/create`, asignatura, { headers });
  }



  obtenerAsignaturaPorId(id: number): Observable<Asignatura> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
    return this.http.get<Asignatura>(`${this.url}/buscar?id=${id}`, {headers});
  }

  asignaturaXCarreara(carreraId: number): Observable<IAsignaturaXCarrera[]> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
    return this.http.get<IAsignaturaXCarrera[]>(`${this.url}/asignaturaXCarrera?carreraId=${carreraId}`, {
      headers,
    });

  }

  graficaAsignatura(asiId:number, carreId:number, perioId:number){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
    return this.http.get<graficaAsignatura[]>(`${this.url}/graficaAsignatura?carreraId=${carreId}&asignaturaId=${asiId}&periodoId=${perioId}`, {
      headers,
    });
  }


  graficaAsignaturaCiclo(asiId:number, carreId:number, perioId:number){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
    return this.http.get<GraficaAsignaturaCiclo[]>(`${this.url}/graficaAsignaturaCiclo?carreraId=${carreId}&asignaturaId=${asiId}&periodoId=${perioId}`, {
      headers,
    });
  }
} 