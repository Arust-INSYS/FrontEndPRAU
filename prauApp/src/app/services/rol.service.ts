import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { SessionStorageService } from './session-storage.service'; // Importa SessionStorageService
import { entorno } from '../env/entorno';
import { Rol } from '../models/rol';


@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) { }

  private url: string = `${entorno.urlPrivada}/rol`
  // private token = this.sessionStorage.getItem('token');


  getAllRoles() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });
    // alert("GESTION= " + this.sessionStorage.getItem('token'))

    return this.http.get<Rol[]>(`${this.url}/read`, { headers });

  }

}
