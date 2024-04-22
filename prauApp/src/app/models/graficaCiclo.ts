export class graficaCiclo{

    ciclo_pertenece: string;
    nombre_asignatura: string;
    total: number;

    constructor(ciclo_pertenece?: string,nombre_asignatura?:string,total?:number){

        this.ciclo_pertenece=ciclo_pertenece||""
        this.nombre_asignatura=nombre_asignatura||""
        this.total=total||0

    }
}