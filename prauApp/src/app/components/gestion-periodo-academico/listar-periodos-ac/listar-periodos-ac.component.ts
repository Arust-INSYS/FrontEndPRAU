import { Component, OnInit } from '@angular/core';
import { PeriodoAc } from '../../../models/PeriodoAc';
import { PeriodoAcService } from '../../../services/periodo-ac.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-periodos-ac',
  templateUrl: './listar-periodos-ac.component.html',
  styleUrl: './listar-periodos-ac.component.css'
})
export class ListarPeriodosAcComponent implements OnInit {



  periodos: PeriodoAc[] = [];
  selectedPeriodoAc: PeriodoAc | null = null; 

  constructor(private periodoAcService: PeriodoAcService,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.periodoAcService.getPeriodosAcs().subscribe((periodos) => {
      this.periodos = periodos;
     // console.log(this.periodos)
      
    });
  }

  
  selectPeriodoAc(periodo: PeriodoAc) {
    this.selectedPeriodoAc = periodo; // Assign selected period for editing
    this.router.navigate(['/registro-periodos-acs', periodo.idPeriodoAc]); // Redirect to edit form with ID
    console.log('================'+this.selectedPeriodoAc.idPeriodoAc);
  }



}
