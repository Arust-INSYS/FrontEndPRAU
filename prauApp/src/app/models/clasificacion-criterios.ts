

export class ClasificacionCriterios {
    idClasificacion: number;
    nombreClasificacion: string;
    descripcion: string;
   
    constructor(
    idClasificacion?: number,
    nombreClasificacion?: string,
    descripcion?: string,
    ) {
        this.idClasificacion = idClasificacion || 0;
        this.nombreClasificacion = nombreClasificacion || '';
        this.descripcion = descripcion || '';
        
        
      }
}
