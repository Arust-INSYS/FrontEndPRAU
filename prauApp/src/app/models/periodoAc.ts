import { Aula } from './aula';

export class PeriodoAc {
  idPeriodoAc: number;
  fechaInicio?: Date;
  fechaFin?: Date;
  nombrePeriodo: string;
  descripcion: string;
  aula?: Aula;

  constructor(
    idPeriodoAc?: number,
    fechaInicio?: Date,
    fechaFin?: Date,
    nombrePeriodo?: string,
    descripcion?: string,
    aula?: Aula
  ) {
    this.idPeriodoAc = idPeriodoAc || 0;
    this.nombrePeriodo = nombrePeriodo || '';
    this.descripcion = descripcion || '';
  }
}
