import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ 
  providedIn: 'root' 
})

export class AuthRolService {
  private nombreRolSubject = new BehaviorSubject<string>('');
  nombreRol$ = this.nombreRolSubject.asObservable();
  
  constructor() {}

  setNombreRol(nombre: string): void {
    this.nombreRolSubject.next(nombre);
  }

  getRolNombre(): string{
    return this.nombreRolSubject.getValue();
  }



}
