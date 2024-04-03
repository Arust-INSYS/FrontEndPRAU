import { Asignatura } from "./asignatura";
import { PeriodoAc } from "./periodoAc";
import { Usuario } from "./usuario";

export class Aula {
  aulaId: number;
  aulaNombre: string;
  cicloPertenece: string;
  observaciones: string;
  usuId: Usuario;
  idAsignatura: Asignatura;
  idPeriodoAc: PeriodoAc;
  


  constructor(
    aulaId?: number,
    aulaNombre?: string,
    cicloPertenece?: string,
    observaciones?: string,
    usuId?: Usuario,
    idAsignatura?: Asignatura,
    idPeriodoAc?: PeriodoAc,
    
  ) {
    this.aulaId = aulaId || 0;
    this.aulaNombre = aulaNombre || '';
    this.cicloPertenece = cicloPertenece || '';
    this.observaciones = observaciones || '';
    this.usuId = usuId || new Usuario();
    this.idAsignatura = idAsignatura || new Asignatura();
    this.idPeriodoAc = idPeriodoAc || new PeriodoAc();

  }
}