
import { FormControl, FormGroup } from '@angular/forms';
// import { Component,OnInit  } from '@angular/core';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CriteriosService } from '../../services/criterios.service';
import { Router } from '@angular/router';
import { ClasificacionCriteriosService } from '../../services/clasificacion-criterios.service';
import { Criterios } from '../../models/criterios';
import { AsignaturaService } from '../../services/asignatura.service';
import { Asignatura } from '../../models/asignatura';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioPorRolDTO } from '../../models/UsuarioPorRolDTO';
import { Carrera } from '../../models/carrera';
import { CarreraService } from '../../services/carrera.service';
import { PeriodoAcService } from '../../services/periodo-ac.service';
import { PeriodoAc } from '../../models/periodoAc';
import { DataMoodleService } from '../../services/dataMoodle.service';
import { GraficosService } from '../../services/graficos.service';
import { GraficaPeriodoAc } from '../../models/GraficaPeriodoAc';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-analisis-uso',
  templateUrl: './analisis-uso.component.html',
  styleUrl: './analisis-uso.component.css'
})
export class AnalisisUsoComponent implements OnInit {


//variables para el chars o grafica
data: any;
options: any;




constructor(
  private periodoAcService: PeriodoAcService,

) {

  
}


ngOnInit(): void {
  this.cargarPeriodos();
  //this.generarGrafica(0)

}
//DROPDOWN PERIODOACADEMICO
periodosAcademicos: any | undefined;
selectedPeriodoAc: any | undefined;
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
        this.generarGrafica(this.codigoPeriodoAc)
        if(this.codigoPeriodoAc==null){
          this.generarGrafica(0)
        }
      } else {
        
        this.codigoPeriodoAc = 0;
        console.log("Evento indefinido. Asignando valor cero.",this.codigoPeriodoAc);
        this.generarGrafica(0)
      }
}


// metod generacion de grafica chart
dataPeriodo:any=[];
generarGrafica(id:number) {
    // Verifica que this.graficas esté correctamente inicializado y tenga los datos necesarios
    this.periodoAcService.obtenerGraficaPeriodoAc(id).subscribe((data) => {
      this.dataPeriodo=data;
      console.log("HOLAA MI REY",data);
      this.dataPeriodo.forEach((periodo:GraficaPeriodoAc) => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: ['C','CM','NC'],
            datasets: [
                {
                    data: [periodo.porc_C, periodo.porc_CM, periodo.porc_NC],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };

      });
      

    });
    
    
  }


  



  //metodo descargar el grafico  en formato PDF
  descargar() {
    let data = document.getElementById('chart');
    html2canvas(data!).then(canvas => {
      // Few necessary setting options
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('grafico.pdf'); // Genera el PDF
    });
  }

}
