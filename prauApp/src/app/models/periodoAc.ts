export class PeriodoAc {
  idPeriodoAc: number;
  fechaInicio: Date;
  fechaFin: Date;
  nombrePeriodo: string;
  descripcion: string;

  constructor(
    idPeriodoAc?: number,
    fechaInicio?: Date,
    fechaFin?: Date,
    nombrePeriodo?: string,
    descripcion?: string
  ) {
    this.idPeriodoAc = idPeriodoAc || 0;
    this.fechaInicio = fechaInicio || new Date();
    this.fechaFin = fechaFin || new Date();
    this.nombrePeriodo = nombrePeriodo || '';
    this.descripcion = descripcion || '';
  }
}