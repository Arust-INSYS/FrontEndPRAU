import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClasificacionCriterios } from '../models/clasificacion-criterios';
import { Observable, map } from 'rxjs';
import { entorno } from '../env/entorno';
import { LocalStorageService } from './local-storage.service';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClasificacionCriteriosService {
  /*private url = "http://localhost:8080/complexivo/ClasificacionCriterio";*/
  private url: string = `${entorno.urlPrivada}/ClasificacionCriterio`
  
 /* private url: string = `${entorno.urlPrivada}/complexivo/ClasificacionCriteri`*/
  
  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }


  obtenerListacriterios(): Observable<ClasificacionCriterios[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`
    });
  
    const options = { headers: headers };

    return this.http.get<ClasificacionCriterios[]>(this.url + '/read', options).pipe(
      catchError(error => {
        console.error('Error obteniendo lista de criterios:', error);
        throw error;
      })
    );
  }

  eliminarcriterios(id: number): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
  
    // Realiza la solicitud HTTP DELETE con el encabezado de autorización
    return this.http.delete(`${this.url}/delete?id=${id}`, { headers });
  }
  
 
  actualizarcriterios(id: number, criterios: ClasificacionCriterios): Observable<ClasificacionCriterios> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<ClasificacionCriterios>(`${this.url}/update?id=${id}`, criterios, { headers }).pipe(
      catchError(error => {
        console.error('Error actualizando criterios:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que lo manejen desde el componente
      })
    );
  }
  registrarcriterios(criterios: ClasificacionCriterios): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<ClasificacionCriterios>(`${this.url}/create`, criterios, { headers });
  }

 

  obtenerCriterioPorId(id: number): Observable<ClasificacionCriterios> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
    return this.http.get<ClasificacionCriterios>(`${this.url}/buscar?id=${id}`,{ headers });
  }

  
  cedulaUnica(ci: string) {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP GET con el encabezado de autorización
    return this.http.get<boolean>(`${this.url}/cedulaUnica?ci=${ci}`, { headers });
  }

}