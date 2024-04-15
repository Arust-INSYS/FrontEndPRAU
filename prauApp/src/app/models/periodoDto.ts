export class periodoDto{
    idPeriodoAc: number;
    nombrePeriodo: string;

    constructor(idPeriodoAc?: number,nombrePeriodo?: string,){
        this.idPeriodoAc = idPeriodoAc || 0;
        this.nombrePeriodo = nombrePeriodo || '';
    }

}