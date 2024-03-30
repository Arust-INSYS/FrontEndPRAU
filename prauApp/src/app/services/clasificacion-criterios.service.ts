import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClasificacionCriterios } from '../models/clasificacion-criterios';
import { Observable, map } from 'rxjs';
import { entorno } from '../env/entorno';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionCriteriosService {
  /*private baseURL = "http://localhost:8080/clasificacion_criterio";*/
  
  private url: string = `${entorno.urlPrivada}/clasificacion-criterios`
  
  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }


  obtenerListacriterios(): Observable<ClasificacionCriterios[]> {
    ClasificacionCriterios
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    return this.http.get(this.url + "/listar").pipe(map(response => response as ClasificacionCriterios[]));
  }

  eliminarcriterios(id: number): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });
  
    // Realiza la solicitud HTTP DELETE con el encabezado de autorización
    return this.http.delete(`${this.url}/delete?id=${id}`, { headers });
  }
  
  actualizarcriterios(id: number, clasificacionCriterios: ClasificacionCriterios): Observable<ClasificacionCriterios> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<ClasificacionCriterios>(`${this.url}/update?id=${id}`, clasificacionCriterios, { headers });
  }
  
  registrarcriterios(clasificacionCriterios: ClasificacionCriterios): Observable<object> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<ClasificacionCriterios>(`${this.url}/create`, clasificacionCriterios, { headers });
  }
  Buscarid(id:number): Observable<ClasificacionCriterios>{
    return this.http.get<ClasificacionCriterios>(this.url+'/listar/'+id);
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