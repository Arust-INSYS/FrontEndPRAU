import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { entorno } from '../env/entorno';

@Injectable({
  providedIn: 'root',
})
export class DataMoodleService {
  private urlPublica: string = `${entorno.urlMoodle}`;
 
  constructor(private http: HttpClient) {}

  //DATOS DE PERSONAS
  getAllData(): Observable<any[]> {
    const url = `${this.urlPublica}/personas`; // Agregar "/personas" a la URL base
    return this.http.get<any[]>(url);
  }

  getDataById(id: string): Observable<any> {
    const url = `${this.urlPublica}/${id}`;
    return this.http.get<any>(url);
  }
}
  // Agrega más métodos según sea necesario, como por ejemplo para crear, actualizar o eliminar datos.

 


