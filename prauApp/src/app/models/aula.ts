import { PeriodoAc } from "./PeriodoAc";

export class Aula {
    aulaId: number;
    aulaNombre: string;
    cicloPertenece: string;
    observaciones: string;
 //   docente: Usuario;
   // asignatura: Asignatura;
    periodoAc: PeriodoAc;
   // evaluaciones: EvaluacionCab[];

    constructor(
        aulaId?: number,
        aulaNombre?: string,
        cicloPertenece?: string,
        observaciones?: string,
      //  docente?: Usuario,
      //  asignatura?: Asignatura,
        periodoAc?: PeriodoAc,
      //  evaluaciones?: EvaluacionCab[]
    ) {
        this.aulaId = aulaId||0;
        this.aulaNombre = aulaNombre||'';
        this.cicloPertenece = cicloPertenece||'';
        this.observaciones = observaciones||'';
       // this.docente = docente;
      //  this.asignatura = asignatura;
        this.periodoAc = periodoAc || new PeriodoAc;
      //  this.evaluaciones = evaluaciones ||[];
    }
}
