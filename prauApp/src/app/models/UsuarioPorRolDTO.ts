export class UsuarioPorRolDTO {
  
    perNombre1: string;
    perApellido1: string;
    rolNombre: string;
    usuId: number;
  
    constructor(nombre: string, apellido: string, rol: string, id: number) {
      this.perNombre1 = nombre;
      this.perApellido1 = apellido;
      this.rolNombre = rol;
      this.usuId = id;
    }
  }
  