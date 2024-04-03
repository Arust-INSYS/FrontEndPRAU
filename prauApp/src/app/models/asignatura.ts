import { Carrera } from './carrera'; 

export class Asignatura {
  idAsignatura: number;
  nombreAsignatura: string;
  descripcionAsignatura: string;
  idCarrera: Carrera;

  constructor(
    idAsignatura?: number,
    nombreAsignatura?: string,
    descripcionAsignatura?: string,
    idCarrera?: Carrera
  ) {
    this.idAsignatura = idAsignatura || 0;
    this.nombreAsignatura = nombreAsignatura || '';
    this.descripcionAsignatura = descripcionAsignatura || '';
    this.idCarrera = idCarrera || new Carrera();
  }
}
