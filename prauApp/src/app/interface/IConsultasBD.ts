import { Aula } from "../models/aula";

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
    aulaId: number;
    nombre: string;
}

export interface IConsultarAulaObj {
    aulaId?: Aula;
    nombre: string;
}


export interface IConsultarCarrera {
    carreraId?: number;
    nombreCarrera: string;
}