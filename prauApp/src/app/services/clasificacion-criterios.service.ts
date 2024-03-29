import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClasificacionCriterios } from '../models/clasificacion-criterios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionCriteriosService {
  private baseURL = "http://localhost:8080/clasificacion_criterio";
  
  constructor(private httpClient: HttpClient) { }

  actualizarcriterios(id: number, clasificacionCriterio: ClasificacionCriterios): Observable<object> {
    return this.httpClient.put(`${this.baseURL}/actualizar/${id}`, clasificacionCriterio);
  }

  guardarcriterios(clasificacionCriterio: ClasificacionCriterios): Observable<object> {
    return this.httpClient.post(`${this.baseURL}/listar`, clasificacionCriterio);
  }

  obtenerListacriterios(): Observable<ClasificacionCriterios[]> {
    return this.httpClient.get<ClasificacionCriterios[]>(`${this.baseURL}/listar`);
  }

  eliminarcriterios(id: number): Observable<object> {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }

  registrarcriterios(clasificacionCriterio: ClasificacionCriterios): Observable<object> {
    return this.httpClient.post(`${this.baseURL}/crear`, clasificacionCriterio);
  }
  Buscarid(id:number): Observable<ClasificacionCriterios>{
    return this.httpClient.get<ClasificacionCriterios>(this.baseURL+'/listar/'+id);
  }
}