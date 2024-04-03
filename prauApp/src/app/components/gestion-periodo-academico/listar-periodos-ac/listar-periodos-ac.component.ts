import { Component, OnInit } from '@angular/core';
import { PeriodoAc } from '../../../models/PeriodoAc';
import { PeriodoAcService } from '../../../services/periodo-ac.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-periodos-ac',
  templateUrl: './listar-periodos-ac.component.html',
  styleUrl: './listar-periodos-ac.component.css'
})
export class ListarPeriodosAcComponent implements OnInit {



  periodos: PeriodoAc[] = [];

  constructor(private periodoAcService: PeriodoAcService) {}

  ngOnInit() {
    this.periodoAcService.getPeriodosAcs().subscribe((periodos) => {
      this.periodos = periodos;
      console.log(this.periodos)
      
    });
  }


}
