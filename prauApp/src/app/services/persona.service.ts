import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private URL_persona =
    'https://660545ba2ca9478ea17fe45a.mockapi.io/app/pruebas/personas';

  constructor(private http: HttpClient) {}
  public getAllPersonas(): Observable<any> {
    return this.http.get(this.URL_persona);
  }
}
