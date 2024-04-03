import { Calificacion } from "./calificacion";
import { Criterios } from "./criterios";
import { EvaluacionCab } from "./evaluacionCab";

export class EvaluacionDet {
   
    secCalificacion: number;
    evaluacionCab: EvaluacionCab;
    calificacion: Calificacion;
    criterio?:Criterios;
    
    constructor(
      secCalificacion?: number,
      evaluacionCab?: EvaluacionCab,
      calificacion?: Calificacion,
      criterio?:Criterios,
  
    ) {
        this.secCalificacion = secCalificacion || 0;
        this.evaluacionCab = evaluacionCab || new EvaluacionCab();
        this.calificacion = calificacion || new Calificacion();
        this.criterio = criterio || new Criterios();
        
      }
}