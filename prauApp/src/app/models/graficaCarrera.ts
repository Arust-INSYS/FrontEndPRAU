import { Carrera } from "./carrera";

export class graficaCarrera {
    carrera: Carrera;
    total_c: number;
    total_cm: number;
    total_nc: number;
    total_criterios: number;
    porc_C: number;
    porc_CM: number;
    porc_NC: number;

    constructor(carrera?: Carrera, total_c?: number, total_cm?: number, total_nc?: number, total_criterios?: number, porc_C?: number, porc_CM?: number, porc_NC?: number) {
        this.carrera = carrera|| new Carrera();
        this.total_c = total_c|| 0;
        this.total_cm = total_cm|| 0;
        this.total_nc = total_nc|| 0;
        this.total_criterios = total_criterios|| 0;
        this.porc_C = porc_C|| 0;
        this.porc_CM = porc_CM|| 0;
        this.porc_NC = porc_NC|| 0;
    }
}
