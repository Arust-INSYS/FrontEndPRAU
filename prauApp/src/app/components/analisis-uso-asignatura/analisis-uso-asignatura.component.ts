import { Component } from '@angular/core';
import { CarreraService } from '../../services/carrera.service';
import { AsignaturaService } from '../../services/asignatura.service';
import { Carrera } from '../../models/carrera';
import { Asignatura } from '../../models/asignatura';
import { IAsignaturaXCarrera } from '../../interface/IConsultasBD';
import { asignaturaDto } from '../../models/asignaturaDto';
import { graficaAsignatura } from '../../models/graficaAsignatura';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-analisis-uso-asignatura',
  templateUrl: './analisis-uso-asignatura.component.html',
  styleUrl: './analisis-uso-asignatura.component.css'
})
export class AnalisisUsoAsignaturaComponent {
  basicData: any;
  basicOptions: any;
  completeData: any;
  completeOptions: any;
  carreras: Carrera[] = [];
  carrera: Carrera = new Carrera();
  graficaAsig:graficaAsignatura[] = [];
  asignaturas: IAsignaturaXCarrera[] = [];
  asignatura: asignaturaDto = new asignaturaDto();
  banderaDatos: boolean = false;
  inidicaInit: boolean = true;
  constructor(private carreServi: CarreraService, private asigService: AsignaturaService) {

  }

  ngOnInit(): void {

    this.cargarCarreras();
    this.cargarAllData();
  }
  private cargarAllData(){
    this.banderaDatos= false;
    this.inidicaInit= true;
    this.asigService.graficaAsignatura(0,0,0).subscribe((dato)=>{

      if(dato ===null){

      }else{

        this.graficaAsig=dato;
        this.cargarDatosGeneralesGrafica()
      }

    });
  }

  cargarDatosGeneralesGrafica(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Inicializa completeData antes de agregar elementos a datasets
    this.completeData = {
      labels: ['Total C', 'Total CM', 'Total NC', 'Proc C', 'Proc CM', 'Porc NC', 'Total Criterios'],
      datasets: []
    };

    for (let index = 0; index < this.graficaAsig.length; index++) {
      let labelData: number[] = [];
      //color aleatorio
      let r=Math.floor(Math.random() * 256);
      let g=Math.floor(Math.random() * 256);
      let b=Math.floor(Math.random() * 256);
      //recuperar datos 
      labelData.push(this.graficaAsig[index].total_c);
      labelData.push(this.graficaAsig[index].total_cm);
      labelData.push(this.graficaAsig[index].total_nc);
      labelData.push(this.graficaAsig[index].porc_C);
      labelData.push(this.graficaAsig[index].porc_CM);
      labelData.push(this.graficaAsig[index].porc_NC);
      labelData.push(this.graficaAsig[index].total_criterios);
      console.log(this.graficaAsig[index].porc_NC)
      let chartDataArray = {
        label: this.graficaAsig[index].asignatura.nombreAsignatura,
        data:labelData,
        backgroundColor: Array(4).fill(`rgba(${r}, ${g}, ${b}, 0.2)`),
        borderColor: Array(4).fill(`rgb(${r}, ${g}, ${b})`),
        borderWidth: 1
      };
      
      this.completeData.datasets.push(chartDataArray)
    }

    this.completeOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
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
  }




  private cargarCarreras() {
    this.carreServi.cargarCarrera().subscribe((dato) => {
      this.carreras = dato;

    });
  }

  private cargarAsignaturas() {
    this.asigService.asignaturaXCarreara(this.carrera.idCarrera).subscribe((dato) => {

      this.asignaturas = dato;

    });
  }
  onOpcionSeleccionada() {
    this.cargarAsignaturas();
  }


  buscarChart() {
    if (this.asignatura.idAsignatura === 0 || this.carrera.idCarrera === 0) {
      return;
    }

    this.asigService.graficaAsignatura(this.carrera.idCarrera,this.asignatura.idAsignatura,0).subscribe((dato)=>{
      if(dato===null){
        this.cargarAllData();
      }else{
        this.graficaAsig=dato
        this.initChart();
        this.banderaDatos= true;
        this.inidicaInit= false;
      }
    });

  }

  initChart() {
    let labelData: number[] = []
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    labelData.push(this.graficaAsig[0].porc_C);
    labelData.push(this.graficaAsig[0].total_cm);
    labelData.push(this.graficaAsig[0].total_nc);
    labelData.push(this.graficaAsig[0].porc_C);
    labelData.push(this.graficaAsig[0].porc_CM);
    labelData.push(this.graficaAsig[0].porc_NC);
    labelData.push(this.graficaAsig[0].total_criterios);
    this.basicData = {
      labels: ['Total C', 'Total CM', 'Total NC', 'Proc C', 'Proc CM', 'Porc NC', 'Total Criterios'],
      datasets: [
        {
          label: this.graficaAsig[0].asignatura.nombreAsignatura,
          data: labelData,
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }

      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
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
  }

  
  crearPDF() {
    const doc = new jsPDF();
    doc.setFont('tahoma');
    doc.setFontSize(14);
    const imageUrl = 'assets/LOGO-TECAZUAY.png';
    doc.addImage(imageUrl, 'JPEG', 70, 0, 65, 30);
    doc.text('Informe de ' + this.graficaAsig[0].asignatura.nombreAsignatura, 80, 40);
    doc.setFontSize(12);
    const maxWidth = doc.internal.pageSize.getWidth() - 20;

    // Obtener el canvas del gráfico y agregarlo al PDF
    const chartCanvas = document.getElementById('chart') as HTMLCanvasElement;
    html2canvas(chartCanvas).then(canvas => {
      let imgWidth = 208;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 50, imgWidth, imgHeight);




      doc.save('infrome' + this.graficaAsig[0].asignatura.nombreAsignatura + '.pdf');
    });
  }
}
