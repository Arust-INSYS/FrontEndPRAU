import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataMoodleService {
  private apiUrl = 'https://660545ba2ca9478ea17fe45a.mockapi.io/app/pruebas';

  constructor(private http: HttpClient) {}

  getAllData(): Observable<any[]> {
    const url = `${this.apiUrl}/personas`; // Agregar "/personas" a la URL base
    return this.http.get<any[]>(url);
  }

  getDataById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Agrega más métodos según sea necesario, como por ejemplo para crear, actualizar o eliminar datos.
}
