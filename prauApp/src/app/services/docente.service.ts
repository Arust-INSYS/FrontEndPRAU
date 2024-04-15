import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { entorno } from '../env/entorno';
import { GraficaDocente } from '../models/GraficaDocente';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private apiUrl: string = entorno.urlPrivada + '/usuario';
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  
  cargarDocentes(): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`
    });
  
    const options = { headers: headers };

    return this.http.get<Usuario[]>(this.apiUrl + '/read?rolNombre=Docente', options)
      .pipe(
        catchError(this.handleError)
      );
  }
  obtenerDatos(docenteId: number, asignaturaId: number, carreraId: number, periodoId: number): Observable<GraficaDocente[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`
    });

    const params = new HttpParams()
      .set('docenteId', docenteId.toString())
      .set('asignaturaId', asignaturaId.toString())
      .set('carreraId', carreraId.toString())
      .set('periodoId', periodoId.toString());

    return this.http.get<GraficaDocente[]>(`${this.apiUrl}/graficaDocente`, { headers, params });
  }
  
  

  // Manejar errores de la solicitud HTTP
  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}