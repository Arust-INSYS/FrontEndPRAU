export class Persona {
  perId: number;
  perCedula: string;
  perNombre1: string;
  perApellido1: string;
  perDireccion: string;
  perTelefono: string;
  perFechaNacimiento?: Date;

  constructor(
    perId?: number,
    perCedula?: string,
    perNombre1?: string,
    perApellido1?: string,
    perDireccion?: string,
    perTelefono?: string,
    perFechaNacimiento?: Date
  ) {
    this.perId = perId || 0;
    this.perCedula = perCedula || '';
    this.perNombre1 = perNombre1 || '';
    this.perApellido1 = perApellido1 || '';
    this.perDireccion = perDireccion || '';
    this.perTelefono = perTelefono || '';
    this.perFechaNacimiento = perFechaNacimiento || new Date();
  }
}
