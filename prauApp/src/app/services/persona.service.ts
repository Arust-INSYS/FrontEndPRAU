import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service'; // Importa localStorageService
import { Persona } from '../models/persona';
import { entorno } from '../env/entorno';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  private apiUrl: string = entorno.urlPrivada + '/usuario';
  private url: string = `${entorno.urlPrivada}/persona`;
  //private token = this.localStorage.getItem('token');

  registrarPersona(persona: Persona): Observable<Persona> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Persona>(`${this.url}/create`, persona, { headers });
  }

  update(id: number, persona: Persona): Observable<Persona> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<Persona>(`${this.url}/update?id=${id}`, persona, {
      headers,
    });
  }
  cargarDocentes(): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const options = { headers: headers };

    return this.http
      .get<Usuario[]>(this.apiUrl + '/read?rolNombre=Docente', options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
  delete(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.delete(`${this.url}/delete?id=${id}`, { headers }); // Asegúrate de cambiar la URL según tu implementación
  }

  cedulaUnica(ci: string) {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP GET con el encabezado de autorización
    return this.http.get<boolean>(`${this.url}/cedulaUnica?ci=${ci}`, {
      headers,
    });
  }
  obtenerListausuarios(): Observable<Persona[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`
    });
  
    const options = { headers: headers };

    return this.http.get<Persona[]>(this.url + '/read', options).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error obteniendo lista de usuarios:', error);
        // Manejo básico del error, lanzando el error para que lo maneje el código que llame a este método
        return throwError('Error al obtener la lista de usuarios. Por favor, inténtalo de nuevo más tarde.');
      })
    );
  }
  getPersonas(): Observable<Persona[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http
      .get(this.url + '/read', { headers })
      .pipe(map((response) => response as Persona[]));
  }
 
  /*
  getPersonas(): Observable<Persona[]> {
    const token = this.localStorage.getItem('token');
    if (!token) {
      // Manejar el caso en el que no haya un token disponible
      // Por ejemplo, redirigir al usuario a la página de inicio de sesión
      // o lanzar un error
      throw new Error('No se ha encontrado un token de autenticación');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Agrega el token JWT aquí
    });

    return this.http
      .get<Persona[]>(this.url + '/read', { headers }) // Modificar el tipo de retorno del GET para que coincida con el tipo de datos esperado
      .pipe(map((response) => response));
  }*/
}
