import { Usuario } from "./usuario";
import { Aula } from "./aula";

export class EvaluacionCab {
  nroEvaluacion: number;
  totalC: number;
  totalCm: number;
  totalNc: number;
  porcTotalC: number;
  porcTotalCm: number;
  porcTotalNc: number;
  progreso: number;

  totalC_Ob_Uno:number;
  totalCM_Ob_Uno:number;
  totalNC_Ob_Uno:number;
  porcTotalC_Ob_Uno:number;
  porcTotalCM_Ob_Uno:number;
  porcTotalNC_Ob_Uno:number;
  progreso_Ob_Uno:number;

  observaciones: string;
  estado: number;
  fechaRegistro: Date;
  aulaEva: Aula;
  evaluador?: Usuario;

  constructor(
    nroEvaluacion?: number,
    totalC?: number,
    totalCm?: number,
    totalNc?: number,
    porcTotalC?: number,
    porcTotalCm?: number,
    porcTotalNc?: number,

    totalC_Ob_Uno?:number,
    totalCM_Ob_Uno?:number,
    totalNC_Ob_Uno?:number,
    porcTotalC_Ob_Uno?:number,
    porcTotalCM_Ob_Uno?:number,
    porcTotalNC_Ob_Uno?:number,
    progreso_Ob_Uno?:number,



    observaciones?: string,
    progreso?: number,
    estado?: number,
    fechaRegistro?: Date,
    aulaEva?: Aula,
    evaluador?: Usuario,

  ) {
    this.nroEvaluacion = nroEvaluacion || 0;
    this.totalC = totalC || 0;
    this.totalCm = totalCm || 0;
    this.totalNc = totalNc || 0;
    this.porcTotalC = porcTotalC || 0;
    this.porcTotalCm = porcTotalCm || 0;
    this.porcTotalNc = porcTotalNc || 0;
    
    this.totalC_Ob_Uno=totalC_Ob_Uno||0;
    this.totalCM_Ob_Uno=totalCM_Ob_Uno||0;
    this.totalNC_Ob_Uno=totalNC_Ob_Uno||0;
    this.porcTotalC_Ob_Uno=porcTotalC_Ob_Uno||0;
    this.porcTotalCM_Ob_Uno=porcTotalCM_Ob_Uno||0;
    this.porcTotalNC_Ob_Uno=porcTotalNC_Ob_Uno||0;
    this.progreso_Ob_Uno=progreso_Ob_Uno||0;



  
    this.observaciones = observaciones || '';
    this.progreso = progreso || 0;
    this.estado = estado || 0;
    this.fechaRegistro = fechaRegistro || new Date;
    this.aulaEva = aulaEva || new Aula();
    this.evaluador = evaluador || new Usuario();
  }
}