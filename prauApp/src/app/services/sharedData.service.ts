import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private idEvaluacionCabeceraSource = new BehaviorSubject<number | null>(null);
  idEvaluacionCabecera$ = this.idEvaluacionCabeceraSource.asObservable();

  actualizarIdEvaluacionCabecera(id: number): void {
    this.idEvaluacionCabeceraSource.next(id);
  }
}