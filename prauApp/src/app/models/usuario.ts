
import { Persona } from "./persona";
import { Rol } from "./rol";


export class Usuario {
  usuId: number;
  usuNombreUsuario: string;
  usuContrasena: string;
  usuCorreo: string;
  usuEstado: number;
  usuFechaRegistro: Date;
  usuPerId: Persona;
  rolId: Rol;
  foto: string; // Campo para la imagen
  titulo: string;
  usuSaldoVacacional: number;
  usuIdLector: number;
  usuIdJefe?: number;


  constructor(
    usuId?: number,
    usuNombreUsuario?: string,
    usuContrasena?: string,
    usuEstado?: number,
    usuFechaRegistro?: Date,
    usuPerId?: Persona,
    rolId?: Rol,
    usuCorreo?: string,
    foto?: string, // Agregar el campo foto al constructor
    titulo?: string,
    usuSaldoVacacional?: number,
    usuIdLector?: number,
    usuIdJefe?: number
  ) {
    this.usuId = usuId || 0;
    this.usuNombreUsuario = usuNombreUsuario || '';
    this.usuContrasena = usuContrasena || '';
    this.usuEstado = usuEstado || 0;
    this.usuFechaRegistro = usuFechaRegistro || new Date();
    this.usuPerId = usuPerId || new Persona();
    this.rolId = rolId || new Rol();
    this.usuCorreo = usuCorreo || '';
    this.foto = foto || ''; // Asignar el valor pasado o null si no se proporciona
    this.titulo = titulo || '';
    this.usuSaldoVacacional = usuSaldoVacacional || 0;
    this.usuIdLector = usuIdLector || 0;
    this.usuIdJefe = usuIdJefe || 0;

  }
}

