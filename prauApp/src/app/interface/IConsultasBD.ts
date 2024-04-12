export interface IAsignaturaXCarrera {
    idAsignatura?: number;
    nombreAsignatura: string;
}

export interface IDocenteXAsignatura {
    usuId?: number;
    nombreCompleto: string;
    perCedula: string;
}

export interface IConsultarAula {
    aulaId?: number;
    nombre: string;
}