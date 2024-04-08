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
    observaciones: string;
    aulaEva?:Aula;
    evaluador?:Usuario;
    
    constructor(
    nroEvaluacion?: number,
    totalC?: number,
    totalCm?: number,
    totalNc?: number,
    porcTotalC?: number,
    porcTotalCm?: number,
    porcTotalNc?: number,
    observaciones?: string,
    aulaEva?:Aula,
    evaluador?:Usuario,
  
    ) {
        this.nroEvaluacion = nroEvaluacion || 0;
        this.totalC = totalC || 0;
        this.totalCm = totalCm || 0;
        this.totalNc = totalNc || 0;
        this.porcTotalC = porcTotalC || 0;
        this.porcTotalCm = porcTotalCm || 0;
        this.porcTotalNc = porcTotalNc || 0;
        this.observaciones = observaciones || '';
        this.aulaEva = aulaEva || new Aula();
        this.evaluador = evaluador || new Usuario();
      }
}