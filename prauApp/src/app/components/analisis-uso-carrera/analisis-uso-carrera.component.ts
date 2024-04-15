import { Component } from '@angular/core';
import { Carrera } from '../../models/carrera';
import { CarreraService } from '../../services/carrera.service';
import { PeriodoAcService } from '../../services/periodo-ac.service';
import { PeriodoAc } from '../../models/periodoAc';
import { periodoDto } from '../../models/periodoDto';
import { graficaCarrera } from '../../models/graficaCarrera';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-analisis-uso-carrera',
  templateUrl: './analisis-uso-carrera.component.html',
  styleUrl: './analisis-uso-carrera.component.css'
})
export class AnalisisUsoCarreraComponent {
  carreras: Carrera[] = [];
  carrera: Carrera = new Carrera();
  periodos: periodoDto[] = [];
  periDto: periodoDto = new periodoDto();
  basicData: any;
  completeData: any;
  completeOptions: any;
  chartCarr: graficaCarrera[] = [];
  banderaDatos: boolean = false;
  inidicaInit: boolean = true;
  basicOptions: any;
  constructor(private carreraService: CarreraService, private periodosService: PeriodoAcService) {
  }

  ngOnInit() {
    this.obtenercarreras();
    this.cargarAllData();
  }

  cargarAllData(){
    this.banderaDatos= false;
  this.inidicaInit= true;
    this.carreraService.graficaCarrera(0, 0).subscribe((dato) => {
   
      if (dato === null) {

      } else {
        this.chartCarr = dato;
       this.cargarDatosGeneralesGrafica()
      }
    });
  }

  cargarDatosGeneralesGrafica() {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Inicializa completeData antes de agregar elementos a datasets
    this.completeData = {
      labels: ['Total C', 'Total CM', 'Total NC', 'Proc C', 'Proc CM', 'Porc NC', 'Total Criterios'],
      datasets: []
    };

    for (let index = 0; index < this.chartCarr.length; index++) {
      let labelData: number[] = [];
      //color aleatorio
      let r=Math.floor(Math.random() * 256);
      let g=Math.floor(Math.random() * 256);
      let b=Math.floor(Math.random() * 256);
      //recuperar datos 
      labelData.push(this.chartCarr[index].total_c);
      labelData.push(this.chartCarr[index].total_cm);
      labelData.push(this.chartCarr[index].total_nc);
      labelData.push(this.chartCarr[index].porc_C);
      labelData.push(this.chartCarr[index].porc_CM);
      labelData.push(this.chartCarr[index].porc_NC);
      labelData.push(this.chartCarr[index].total_criterios);
      console.log(this.chartCarr[index].porc_NC)
      let chartDataArray = {
        label: this.chartCarr[index].carrera.nombreCarrera,
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


  obtenercarreras() {
    this.carreraService.obtenerListaCarreras().subscribe((dato) => {
      this.carreras = dato;
    });
  }

  buscarChart() {

    if (this.carrera.idCarrera === 0 || this.periDto.idPeriodoAc === 0) {
      // No hagas nada si carrera.idCarrera o periDto.idPeriodoAc son 0

      return;
    }
    this.carreraService.graficaCarrera(this.carrera.idCarrera, this.periDto.idPeriodoAc).subscribe((dato) => {

      if (dato === null) {

        this.cargarAllData();
      } else {

        this.chartCarr = dato;
        this.initChart();
        this.banderaDatos= true;
        this.inidicaInit= false;
      }
    });

  }


  obtenerPeriodos() {
    this.cargarDatosGeneralesGrafica();
    this.periodosService.getPeriodosAcs().subscribe((dato) => {
      //parsero para mostrar datos 

      let arrayPerio: periodoDto[] = [];

      dato.forEach(peri => {
        let perio: periodoDto = new periodoDto();
        perio.nombrePeriodo = peri.fechaInicio.toString().slice(0, 10) + " - " + peri.fechaFin.toString().slice(0, 10)
        perio.idPeriodoAc = peri.idPeriodoAc
        arrayPerio.push(perio)
      });
      this.periodos = arrayPerio

    });

  }

  onOpcionSeleccionada() {

    this.obtenerPeriodos();
  }

  initChart() {
    let labelData: number[] = []
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    labelData.push(this.chartCarr[0].total_c);
    labelData.push(this.chartCarr[0].total_cm);
    labelData.push(this.chartCarr[0].total_nc);
    labelData.push(this.chartCarr[0].porc_C);
    labelData.push(this.chartCarr[0].porc_CM);
    labelData.push(this.chartCarr[0].porc_NC);
    labelData.push(this.chartCarr[0].total_criterios);
    this.basicData = {
      labels: ['Total C', 'Total CM', 'Total NC', 'Proc C', 'Proc CM', 'Porc NC', 'Total Criterios'],
      datasets: [
        {
          label: this.chartCarr[0].carrera.nombreCarrera,
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
    doc.text('Informe de ' + this.chartCarr[0].carrera.nombreCarrera, 80, 40);
    doc.setFontSize(12);
    const maxWidth = doc.internal.pageSize.getWidth() - 20;

    // Obtener el canvas del gráfico y agregarlo al PDF
    const chartCanvas = document.getElementById('chart') as HTMLCanvasElement;
    html2canvas(chartCanvas).then(canvas => {
      let imgWidth = 208;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 50, imgWidth, imgHeight);


      doc.text("Modificar texto ", 77, 160);


      doc.text("Modificar texto", 77, 180);


      doc.text("Modificar texto", 77, 200);



      doc.text("__________________________", 77, 210);
      doc.text("Recibido", 96, 215);

      doc.save('infrome' + this.chartCarr[0].carrera.nombreCarrera + '.pdf');
    });
  }

}
