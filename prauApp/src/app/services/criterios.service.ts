import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Criterios } from '../models/criterios';
import { Observable, map } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { entorno } from '../env/entorno';
@Injectable({
  providedIn: 'root'
})
export class CriteriosService {
  /*private baseURL = "http://localhost:8080/criterios";*/
  private url: string = `${entorno.urlPrivada}/criterios`
  
  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }


  obtenerListacriterios(): Observable<Criterios[]> {
Criterios
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    return this.http.get(this.url + "/listar").pipe(map(response => response as Criterios[]));
  }

  eliminarcriterios(id: number): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
  
    // Realiza la solicitud HTTP DELETE con el encabezado de autorización
    return this.http.delete(`${this.url}/delete?id=${id}`, { headers });
  }
  
  actualizarcriterios(id: number, criterios: Criterios): Observable<Criterios> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<Criterios>(`${this.url}/update?id=${id}`, criterios, { headers });
  }
  
  registrarcriterios(criterios: Criterios): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Criterios>(`${this.url}/create`, criterios, { headers });
  }
  Buscarid(id:number): Observable<Criterios>{
    return this.http.get<Criterios>(this.url+'/listar/'+id);
  }
  
  cedulaUnica(ci: string) {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP GET con el encabezado de autorización
    return this.http.get<boolean>(`${this.url}/cedulaUnica?ci=${ci}`, { headers });
  }

}