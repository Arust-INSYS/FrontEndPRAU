export class Persona {
  perId: number;
  perCedula: string;
  perNombre1: string;
  perNombre2: string;
  perApellido1: string;
  perApellido2: string;
  perDireccion: string;
  perTelefono: string;
  perFechaNacimiento?: Date;

  constructor(
    perId?: number,
    perCedula?: string,
    perNombre1?: string,
    perNombre2?: string,
    perApellido1?: string,
    perApellido2?: string,
    perDireccion?: string,
    perTelefono?: string,
    perFechaNacimiento?: Date
  ) {
    this.perId = perId || 0;
    this.perCedula = perCedula || '';
    this.perNombre1 = perNombre1 || '';
    this.perNombre2 = perNombre2 || '';
    this.perApellido1 = perApellido1 || '';
    this.perApellido2 = perApellido2 || '';
    this.perDireccion = perDireccion || '';
    this.perTelefono = perTelefono || '';
    this.perFechaNacimiento = perFechaNacimiento || new Date();
  }
}
