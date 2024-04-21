export class graficaResumenCiclo{

    total:number;
    ciclo_pertenece:string;
    nombre_carrera:string;

    constructor(total:number,ciclo_pertenece:string,nombre_carrera:string){
        this.total=total||0
        this.ciclo_pertenece=ciclo_pertenece||""
        this.nombre_carrera=nombre_carrera||""
    }


}