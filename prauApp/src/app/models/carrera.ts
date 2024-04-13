import { Usuario } from './usuario';
export class Carrera {
  idCarrera: number;
  nombreCarrera: string;
  descripcionCarrera: string;
  director?: Usuario;
  constructor(
    idCarrera?: number,
    nombreCarrera?: string,
    descripcionCarrera?: string,
    director?: Usuario
  ) {
    this.idCarrera = idCarrera || 0;
    this.nombreCarrera = nombreCarrera || '';
    this.descripcionCarrera = descripcionCarrera || '';
  }
}
