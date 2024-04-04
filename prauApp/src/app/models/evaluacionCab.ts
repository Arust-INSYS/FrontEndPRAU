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
    aula?:Aula;
    usuario?:Usuario;
    
    constructor(
    nroEvaluacion?: number,
    totalC?: number,
    totalCm?: number,
    totalNc?: number,
    porcTotalC?: number,
    porcTotalCm?: number,
    porcTotalNc?: number,
    observaciones?: string,
    aula?:Aula,
    usuario?:Usuario,
  
    ) {
        this.nroEvaluacion = nroEvaluacion || 0;
        this.totalC = totalC || 0;
        this.totalCm = totalCm || 0;
        this.totalNc = totalNc || 0;
        this.porcTotalC = porcTotalC || 0;
        this.porcTotalCm = porcTotalCm || 0;
        this.porcTotalNc = porcTotalNc || 0;
        this.observaciones = observaciones || '';
        this.aula = aula || new Aula();
        this.usuario = usuario || new Usuario();
      }
}