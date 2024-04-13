import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../services/docente.service';

@Component({
  selector: 'app-analisis-grafica-docente',
  templateUrl: './analisis-grafica-docente.component.html',
  styleUrl: './analisis-grafica-docente.component.css'
})
export class AnalisisGraficaDocenteComponent implements OnInit {
  data: any;

  options: any;
  constructor(private docenteService: DocenteService) { }
  ngOnInit() {
    this.mostrarDocente()
      
  }
  mostrarDocente(){
    this.docenteService.obtenerDatos(4, 1, 1, 1).subscribe(data => {
      console.log("I HAVE THE POWER!!",data);
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.data = {
          labels: ['Cumple', 'Cumple Medio', 'No Cumple'],
          datasets: [
              {
                  type: 'bar',
                  label: 'C',
                  backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                  data: [data[0].porc_C]
              },
              {
                  type: 'bar',
                  label: 'CM',
                  backgroundColor: documentStyle.getPropertyValue('--green-500'),
                  data: [data[0].porc_CM,data[0].porc_CM]
              },
              {
                  type: 'bar',
                  label: 'NC',
                  backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                  data: [data[0].porc_NC,data[0].porc_NC,data[0].porc_NC]
              }

              
          ]
      };

      this.options = {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
              tooltip: {
                  mode: 'index',
                  intersect: false
              },
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  stacked: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  stacked: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };
    });
  }
}
