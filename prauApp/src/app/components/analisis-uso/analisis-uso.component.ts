
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


@Component({
  selector: 'app-analisis-uso',
  templateUrl: './analisis-uso.component.html',
  styleUrl: './analisis-uso.component.css'
})
export class AnalisisUsoComponent implements OnInit{

  criterio: Criterios[] = [];

  data: any;
  options: any;
  opcines: string[] | undefined;
  selectedOpcines: string | undefined;
  value: string | undefined; 
  value2: string | undefined;

  constructor(
    private criteriosService: CriteriosService,
    private router: Router,
    private clasificacionCriteriosService: ClasificacionCriteriosService
  ) {}

  obtenerCriterios() {
    this.criteriosService.obtenerListacriterios().subscribe(dato => {
      this.criterio = dato;
    });
  }

  formGroup: FormGroup = new FormGroup({});

 

    ngOnInit() {
      this.obtenerCriterios();
      console.log(this.obtenerCriterios);

      this.formGroup = new FormGroup({
        selectedCountry: new FormControl<object | null>(null)
      });

      this.opcines = ['Periodo Academico', 'Docente', 'Carrera'];
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
     // const labels = this.criterio.map(c => c.nombreCriterio);
      const labels = ['criterio 1', 'criterio 2', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; // Agrega más etiquetas aquí
      const dataValues = [54, 32, 72, 45, 30, 50, 20, 60, 33, 80]; // Agrega más 
  
      const backgroundColors = Array.from({ length: labels.length }, () => '#' + (Math.random().toString(16) + '000000').substring(2, 8)); // Genera colores aleatorios

      this.data = {
        labels: labels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: backgroundColors,
            hoverBackgroundColor: backgroundColors.map(color => color + '100') // Agrega más colores aquí
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
        },
        responsive: true,
        maintainAspectRatio: false
      };
      
    }

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
