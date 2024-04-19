import { graficaAsignatura } from "./graficaAsignatura";

export class GraficaAsignaturaCiclo {
    cicloPertenece: string;
    asignaturas: graficaAsignatura[];
    
    constructor(cicloPertenece: string, asignaturas: graficaAsignatura[]) {
        this.cicloPertenece = cicloPertenece;
        this.asignaturas = asignaturas;
    }
}
