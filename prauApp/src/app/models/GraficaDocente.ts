import { Usuario } from "./usuario";

export class GraficaDocente {
    docente: Usuario;
    total_c: number;
    total_cm: number;
    total_nc: number;
    total_criterios: number;
    porc_C: number;
    porc_CM: number;
    porc_NC: number;
  
    constructor(
      docente: Usuario,
      total_c: number,
      total_cm: number,
      total_nc: number,
      total_criterios: number,
      porc_C: number,
      porc_CM: number,
      porc_NC: number
    ) {
      this.docente = docente;
      this.total_c = total_c;
      this.total_cm = total_cm;
      this.total_nc = total_nc;
      this.total_criterios = total_criterios;
      this.porc_C = porc_C;
      this.porc_CM = porc_CM;
      this.porc_NC = porc_NC;
    }
  }