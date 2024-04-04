export class Calificacion {
  codCalificacion: string;
  descripcion: string;

  constructor(codCalificacion?: string, descripcion?: string) {
    this.codCalificacion = codCalificacion || '';
    this.descripcion = descripcion || '';
  }
}
