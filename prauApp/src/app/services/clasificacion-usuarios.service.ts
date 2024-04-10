import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable, map, throwError } from 'rxjs';
import { entorno } from '../env/entorno';
import { LocalStorageService } from './local-storage.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionUsuariosService {
  /*private url = "http://localhost:8080/complexivo/ClasificacionCriterio";*/
  private url: string = `${entorno.urlPrivada}/usuario`
  
 /* private url: string = `${entorno.urlPrivada}/complexivo/ClasificacionCriteri`*/
  
  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }


  obtenerListausuarios(): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`
    });
  
    const options = { headers: headers };

    return this.http.get<Usuario[]>(this.url + '/read', options).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error obteniendo lista de usuarios:', error);
        // Manejo básico del error, lanzando el error para que lo maneje el código que llame a este método
        return throwError('Error al obtener la lista de usuarios. Por favor, inténtalo de nuevo más tarde.');
      })
    );
  }
  obtenerUsuariosPorRol(roleId: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}/usuariosPorRol?roleId=${roleId}`);
  }
  eliminarusuarios(id: number): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
  
    // Realiza la solicitud HTTP DELETE con el encabezado de autorización
    return this.http.delete(`${this.url}/delete?id=${id}`, { headers });
  }
  
 
  actualizarusuarios(id: number, criterios: Usuario): Observable<Usuario> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<Usuario>(`${this.url}/update?id=${id}`, criterios, { headers }).pipe(
      catchError(error => {
        console.error('Error actualizando criterios:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que lo manejen desde el componente
      })
    );
  }
  registrarcriterios(criterios: Usuario): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Usuario>(`${this.url}/create`, criterios, { headers });
  }

 

  obtenerNombresUsuariosPorRolId(rolId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/searchUserId?roleId=${rolId}`);
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(error);
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