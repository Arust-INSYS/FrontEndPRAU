import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiUrl = 'http://localhost:8080/complexivo/rol';

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.apiUrl}/read`);
  }

  createRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(`${this.apiUrl}/create`, rol);
  }

  actualizarRol(id: number, rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.apiUrl}/update/${id}`, rol);
  }

  eliminarRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
