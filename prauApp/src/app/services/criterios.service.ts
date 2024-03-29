import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Criterios } from '../models/criterios';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CriteriosService {
  private baseURL = "http://localhost:8080/criterios";
  
  constructor(private httpClient: HttpClient) { }

  actualizarcriterios(id: number, criterios: Criterios): Observable<object> {
    return this.httpClient.put(`${this.baseURL}/actualizar/${id}`, criterios);
  }

  guardarcriterios(criterios: Criterios): Observable<object> {
    return this.httpClient.post(`${this.baseURL}/listar`, criterios);
  }

  obtenerListacriterios(): Observable<Criterios[]> {
    return this.httpClient.get<Criterios[]>(`${this.baseURL}/listar`);
  }

  eliminarcriterios(id: number): Observable<object> {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }

  registrarcriterios(criterios: Criterios): Observable<object> {
    return this.httpClient.post(`${this.baseURL}/crear`, criterios);
  }
  Buscarid(id:number): Observable<Criterios>{
    return this.httpClient.get<Criterios>(this.baseURL+'/listar/'+id);
  }
}