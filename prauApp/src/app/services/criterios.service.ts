import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Criterios } from '../models/criterios';
import { Observable, map } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { entorno } from '../env/entorno';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CriteriosService {
 /* private url = "http://localhost:8080/complexivo/criterio";*/
  private url: string = `${entorno.urlPrivada}/criterio`
  
  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  /*obtenerListacriterios(): Observable<Criterios[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`
    });

    const options = { headers: headers };

    return this.http.get<Criterios[]>(this.url + '/read', options);
  }*/
  obtenerListacriterios(): Observable<Criterios[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`
    });
  
    const options = { headers: headers };

    return this.http.get<Criterios[]>(this.url + '/read', options).pipe(
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
  
 
  actualizarcriterios(id: number, criterios: Criterios): Observable<Criterios> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<Criterios>(`${this.url}/update?id=${id}`, criterios, { headers }).pipe(
      catchError(error => {
        console.error('Error actualizando criterios:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que lo manejen desde el componente
      })
    );
  }
  registrarcriterios(criterios: Criterios): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Criterios>(`${this.url}/create`, criterios, { headers });
  }

 

  obtenerCriterioPorId(id: number): Observable<Criterios> {
    return this.http.get<Criterios>(`${this.url}/buscar?id=${id}`);
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