import { Asignatura } from './asignatura';
import { PeriodoAc } from './periodoAc';
import { Usuario } from './usuario';

export class Aula {
  aulaId: number;
  aulaNombre: string;
  cicloPertenece: string;
  observaciones: string;
  docente: Usuario;
 asignatura: Asignatura;
  periodoAc: PeriodoAc;
  // evaluaciones: EvaluacionCab[];

  constructor(
    aulaId?: number,
    aulaNombre?: string,
    cicloPertenece?: string,
    observaciones?: string,
    docente?: Usuario,
     asignatura?: Asignatura,
    periodoAc?: PeriodoAc
    //  evaluaciones?: EvaluacionCab[]
  ) {
    this.aulaId = aulaId || 0;
    this.aulaNombre = aulaNombre || '';
    this.cicloPertenece = cicloPertenece || '';
    this.observaciones = observaciones || '';
    this.docente = docente || new Usuario;
    this.asignatura = asignatura || new Asignatura;
    this.periodoAc = periodoAc || new PeriodoAc();
    //  this.evaluaciones = evaluaciones ||[];
  }
}
