import { Asignatura } from "./asignatura";
import { EvaluacionesCab } from "./evaluacionesCab";
import { PeriodoAc } from "./periodoAc";
import { Usuario } from "./usuario";

export class Aula {
    aulaId: number;
    aulaNombre: string;
    cicloPertenece: string;
    observaciones: string;
    docente?: Usuario;
    asignaturas?: Asignatura;
    idPeriodoAc?: PeriodoAc;
    aulaEva?: EvaluacionesCab;

    constructor(
        aulaId?: number,
        aulaNombre?: string,
        cicloPertenece?: string,
        observaciones?: string,
        docente?: Usuario,
        asignaturas?:Asignatura,
        idPeriodoAc?: PeriodoAc,
        aulaEva?: EvaluacionesCab,

    ) {
        this.aulaId = aulaId || 0;
        this.aulaNombre = aulaNombre || '';
        this.cicloPertenece = cicloPertenece || '';
        this.observaciones = observaciones || '';

      }
}