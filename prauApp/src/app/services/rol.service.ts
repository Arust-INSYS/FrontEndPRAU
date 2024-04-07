import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';;
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';
//Cambios
@Injectable({
  providedIn: 'root',
})
export class RolService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  private url: string = `${entorno.urlPrivada}/rol`;
  // private token = this.localStorage.getItem('token');

  getAllRoles() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });
    // alert("GESTION= " + this.localStorage.getItem('token'))

    return this.http.get<Rol[]>(`${this.url}/read`, { headers });
  }
  createRol(rol: Rol): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`,
    });

    return this.http.post<any>(`${this.url}/create`, rol, { headers });
  }
  actualizarRol(id: number, rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.apiUrl}/update/${id}`, rol);
  }
}
eliminarRol(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
}