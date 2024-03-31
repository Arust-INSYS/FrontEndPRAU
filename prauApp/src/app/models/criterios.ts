import { ClasificacionCriterios } from "./clasificacion-criterios";

export class Criterios {
   
    idCriterio: number;
    nombreCriterio: string;
    descripcion: string;
   
    clasificacioncriterio?:ClasificacionCriterios;
    
    constructor(
    idCriterio?: number,
    nombreCriterio?: string,
    descripcion?: string,
    id_clasificacion_criterios?: number,
  
    ) {
        this.idCriterio = idCriterio || 0;
        this.nombreCriterio = nombreCriterio || '';
        this.descripcion = descripcion || '';
        
        
      }
}

  
  