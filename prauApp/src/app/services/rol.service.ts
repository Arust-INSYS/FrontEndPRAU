import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Rol } from '../models/rol';
import { LocalStorageService } from './local-storage.service';
import { entorno } from '../env/entorno';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url: string = `${entorno.urlPrivada}/rol`;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  getAllRoles(): Observable<Rol[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.getItem('token')}`
    });

    return this.http.get<Rol[]>(`${this.url}/read`, { headers }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud HTTP:', error);
        return throwError('Error en la solicitud HTTP al obtener todos los roles.');
      })
    );
  }

  createRol(rol: Rol): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.getItem('token')}`
    });

    return this.http.post<any>(`${this.url}/create`, rol, { headers }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud HTTP:', error);
        return throwError('Error en la solicitud HTTP al crear un nuevo rol.');
      })
    );
  }

  actualizarRol(id: number, rol: Rol): Observable<Rol> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.getItem('token')}`
    });

    return this.http.put<Rol>(`${this.url}/update/${id}`, rol, { headers }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud HTTP:', error);
        return throwError('Error en la solicitud HTTP al actualizar el rol.');
      })
    );
  }

  eliminarRol(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.getItem('token')}`
    });

    return this.http.delete<void>(`${this.url}/delete/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud HTTP:', error);
        return throwError('Error en la solicitud HTTP al eliminar el rol.');
      })
    );
  }

  searchRolId(id: number): Observable<Rol> {
    const token = this.localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró el token en el localStorage.');
      return throwError('Token JWT no encontrado en el almacenamiento local.');
    }


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.url}/searchRolId?id=${id}`;
    return this.http.get<Rol>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud HTTP:', error);
        return throwError('Error en la solicitud HTTP al buscar el rol por ID.');
      })
    );
  }
  getRolById(id: number): Observable<Rol> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Rol>(`${this.url}/find/${id}`, { headers });
  }
}
