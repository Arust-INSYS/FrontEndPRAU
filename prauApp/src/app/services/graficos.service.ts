import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { entorno } from '../env/entorno';

@Injectable({
  providedIn: 'root',
})
export class GraficosService {
  private urlPublica: string = `${entorno.urlMoodle}`;
  private urlGrafica: string = `https://6610a0b70640280f219d3949.mockapi.io/api`;
  
  constructor(private http: HttpClient) {}



  // metodo de ver grafica

  getAllGrafica(): Observable<any[]> {
    const url = `${this.urlGrafica}/EvaluacionCab`;
    return this.http.get<any[]>(url);
  }

 


}
