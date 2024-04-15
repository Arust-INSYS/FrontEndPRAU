import { Asignatura } from "./asignatura";

export class graficaAsignatura {
    asignatura: Asignatura;
    total_c: number;
    total_cm: number;
    total_nc: number;
    total_criterios: number;
    porc_C: number;
    porc_CM: number;
    porc_NC: number;

    constructor(asignatura?: Asignatura,total_c?: number, total_cm?: number, total_nc?: number, total_criterios?: number, porc_C?: number, porc_CM?: number, porc_NC?: number) {
        this.asignatura = asignatura|| new Asignatura();
        this.total_c = total_c||0;
        this.total_cm = total_cm||0;
        this.total_nc = total_nc||0;
        this.total_criterios = total_criterios||0;
        this.porc_C = porc_C||0;
        this.porc_CM = porc_CM||0;
        this.porc_NC = porc_NC||0;
    }
}
