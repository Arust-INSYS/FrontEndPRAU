import { Component, OnInit } from '@angular/core';
import { PeriodoAc } from '../../../models/periodoAc';
import { PeriodoAcService } from '../../../services/periodo-ac.service';
//import { PeriodoAc } from '../../../models/';

@Component({
  selector: 'app-registrar-aula',
  templateUrl: './registrar-aula.component.html',
  styleUrl: './registrar-aula.component.css'
})
export class RegistrarAulaComponent implements OnInit{


  opciones1: string[] = ['Opcion 1', 'Opcion 2', 'Opcion 3'];
  opciones2: string[] = ['Opcion 4', 'Opcion 5', 'Opcion 6'];
  opciones3: string[] = ['Opcion 7', 'Opcion 8', 'Opcion 9'];

  selectedOpcion1: string = this.opciones1[0];
  selectedOpcion2: string = this.opciones2[0];
  selectedOpcion3: string = this.opciones3[0];

  periodos: PeriodoAc[] = [];
  selectedPeriodo: PeriodoAc | undefined;

  constructor(private periodoAcService: PeriodoAcService) { }

 ngOnInit() {
    this.periodoAcService.getPeriodosAcs().subscribe((periodos) => {
      this.periodos = periodos;
      
    });
  }

  onPeriodoChange(event: any) {
    this.selectedPeriodo = this.periodos.find(periodo => periodo.idPeriodoAc == event.target.value);
    if (this.selectedPeriodo) {
      console.log('Selected Periodo ID:', this.selectedPeriodo.idPeriodoAc);
    }
  }
}
