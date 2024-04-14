import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../services/docente.service';
import { PeriodoAcService } from '../../services/periodo-ac.service';
import { PeriodoAc } from '../../models/periodoAc';
import { GraficaDocente } from '../../models/GraficaDocente';


@Component({
  selector: 'app-analisis-grafica-docente',
  templateUrl: './analisis-grafica-docente.component.html',
  styleUrl: './analisis-grafica-docente.component.css',
})
export class AnalisisGraficaDocenteComponent implements OnInit {
  data: any;
  options: any;

  periodosAcademicos: any[] | undefined;
  selectedPeriodoAc: string | undefined;
  constructor(
    private docenteService: DocenteService,
    private periodoAcService: PeriodoAcService,
    
  ) {}
  ngOnInit() {
    this.mostrarDocente();
    this.cargarPeriodos();
    
  }
    //ARRAYS FILTROS
    periodosAc: PeriodoAc[] = [];
    cargarPeriodos(): void {
      this.periodoAcService.getPeriodosAcs().subscribe((response) => {
        this.periodosAc = response;
        console.log("FILTROS", response)
        // Limpiar el array antes de agregar nuevos elementos
      this.periodosAcademicos = [];

      // Iterar sobre los periodos y agregarlos a periodosAcademicos
      for (const periodo of this.periodosAc) {
        this.periodosAcademicos.push({ name: periodo.nombrePeriodo, code:periodo?.idPeriodoAc });
      }
        
      });
    }
    codigoPeriodoAc:number=0;
    cambioValor(event: any){
        if (event && event.code) {
            console.log("Cambié de valor:", event.code);
            this.codigoPeriodoAc = event.code;
          } else {
            
            this.codigoPeriodoAc = 0;
            console.log("Evento indefinido. Asignando valor cero.",this.codigoPeriodoAc);
          }
    }
dataDocente:any=[];

  mostrarDocente() {
    this.docenteService.obtenerDatos(0, 0, 0, this.codigoPeriodoAc).subscribe((data) => {
        this.dataDocente=data;
        this.dataDocente.forEach((docente:GraficaDocente) => {
            console.log('I HAVE THE POWER!!', data);
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue(
              '--text-color-secondary'
            );
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      
            this.data = {
              labels: ['Cumple', 'Cumple Medio', 'No Cumple'],
              datasets: [
                {
                  type: 'bar',
                  label: 'C',
                  backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                  data: [docente.porc_C],
                },
                {
                  type: 'bar',
                  label: 'CM',
                  backgroundColor: documentStyle.getPropertyValue('--green-500'),
                  data: [docente.porc_CM, docente.porc_CM],
                },
                {
                  type: 'bar',
                  label: 'NC',
                  backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                  data: [docente.porc_NC, docente.porc_NC, docente.porc_NC],
                },
              ],
            };
      
            this.options = {
              maintainAspectRatio: false,
              aspectRatio: 0.8,
              plugins: {
                tooltip: {
                  mode: 'index',
                  intersect: false,
                },
                legend: {
                  labels: {
                    color: textColor,
                  },
                },
              },
              scales: {
                x: {
                  stacked: true,
                  ticks: {
                    color: textColorSecondary,
                  },
                  grid: {
                    color: surfaceBorder,
                    drawBorder: false,
                  },
                },
                y: {
                  stacked: true,
                  ticks: {
                    color: textColorSecondary,
                  },
                  grid: {
                    color: surfaceBorder,
                    drawBorder: false,
                  },
                },
              },
            };  


            
          });
      
    });
  }
}
