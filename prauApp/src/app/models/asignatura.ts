import { Carrera } from "./carrera";
 
 export class Asignatura{
  

    idAsignatura: number;
    nombreAsignatura: string;
    descripcionAsignatura: string;
   
    carrera?:Carrera;
    
    constructor(
    idAsignatura?: number,
    nombreAsignatura?: string,
    descripcionAsignatura?: string,
    idCarrera?: number,
  
    ) {
        this.idAsignatura = idAsignatura || 0;
        this. nombreAsignatura =  nombreAsignatura || '';
        this.descripcionAsignatura = descripcionAsignatura || '';
        
        
      }
}

