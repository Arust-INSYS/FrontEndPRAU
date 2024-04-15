export class asignaturaDto{
    idAsignatura: number;
    nombreAsignatura: string;

    constructor(nombreAsignatura?: string, idAsignatura?: number) {
        this.nombreAsignatura = nombreAsignatura||"";
        this.idAsignatura = idAsignatura|| 0;
    }
}