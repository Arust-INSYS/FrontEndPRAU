import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { entorno } from '../env/entorno';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private apiUrl: string = entorno.urlPrivada + '/usuario';

  constructor(private http: HttpClient) {}
  cargarDocentes(): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  
    const options = { headers: headers };

    return this.http.get<Usuario[]>(this.apiUrl + '/read?rolNombre=Docente', options)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Manejar errores de la solicitud HTTP
  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}