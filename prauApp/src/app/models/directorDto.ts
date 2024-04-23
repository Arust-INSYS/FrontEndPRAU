export class directorDto{

    per_nombre1:string
    per_nombre2:string
    per_apellido1:string
    per_apellido2:string

    constructor(per_nombre1?:string,per_nombre2?:string,per_apellido1?:string,per_apellido2?:string){
        this.per_nombre1=per_nombre1||""
        this.per_nombre2=per_nombre2||""
        this.per_apellido1=per_apellido1||""
        this.per_apellido2=per_apellido2||""
    }
}