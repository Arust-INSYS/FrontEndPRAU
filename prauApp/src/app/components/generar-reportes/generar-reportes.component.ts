import { Component, ElementRef, ViewChild } from '@angular/core';
import { PeriodoAc } from '../../models/periodoAc';
import { IAsignaturaXCarrera, IConsultarCarrera } from '../../interface/IConsultasBD';
import { PeriodoAcService } from '../../services/periodo-ac.service';
import { CarreraService } from '../../services/carrera.service';
import { AsignaturaService } from '../../services/asignatura.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { CriteriosService } from '../../services/criterios.service';
import { Criterios } from '../../models/criterios';
import jsPDF from 'jspdf';
import { Chart } from 'chart.js';
import html2canvas from 'html2canvas';
import { graficaAula } from '../../models/graficaAula';
import { AulaService } from '../../services/aula.service';
import { HttpClient } from '@angular/common/http';
import { DocenteService } from '../../services/docente.service';
import { GraficaDocente } from '../../models/GraficaDocente';
import 'chartjs-plugin-datalabels';
import { EvaluacionCabService } from '../../services/evaluacionCab.service';
import { EvaluacionCab } from '../../models/evaluacionCab';
import { EvaluacionDetService } from '../../services/evaluacionDet.service';
import { EvaluacionDet } from '../../models/evaluacionDet';


@Component({
  selector: 'app-generar-reportes',
  templateUrl: './generar-reportes.component.html',
  styleUrl: './generar-reportes.component.css'
})
export class GenerarReportesComponent {
  selectedPeriodo: any;
  selectedCarrera: any;
  selectedAsignatura: any;
  criterios: Criterios[] = [];
  periodosAc: PeriodoAc[] = [];
  carreras: IConsultarCarrera[] = [];
  asignaturas: IAsignaturaXCarrera[] = [];
  grafiCiclos: graficaAula[] = [];
  evaDet: EvaluacionDet[] = [];
  filterIdCriterio: number[] = []
  userId!: bigint;
  infoUser: any;
  ahora = new Date();
  fecha: string = ""
  basicData: any;
  basicOptions: any;
  dataCM: any;
  optionsCM: any;
  data: any;
  options: any;
  dataCrite: any;
  optionsCrite: any;
  constructor(private http: HttpClient, private docenteService: DocenteService, private periodoAcService: PeriodoAcService, private carreraService: CarreraService, private asignaturaService: AsignaturaService, private localStorage: LocalStorageService, private usurioService: UsuarioService, private criteServi: CriteriosService, private aulaServi: AulaService, private detServi: EvaluacionDetService) {
    //
  }



  ngOnInit(): void {
    let dia = this.ahora.getDate();
    let mes = this.ahora.getMonth() + 1; // Sumamos 1 porque los meses comienzan desde 0
    let año = this.ahora.getFullYear();
    this.fecha = dia + "/" + mes + "/" + año + ""

    this.userId = BigInt(this.localStorage.getItem('userId') as unknown as bigint);
    const id: number = Number(this.userId);
    this.usurioService.buscarNombreUsuario(id).subscribe(data => {
      this.infoUser = data;

    });
    this.loadPeriodos();
    this.loadCarreras();
    this.loadAsignaturas();
    this.loadCriterios();
    this.fetchChartData();
    this.loadevaDet();

  }


  loadevaDet() {
    this.detServi.getEvaluacionDET().subscribe((datos) => {
      this.evaDet = datos;
      console.log("datos antes de filtrar",datos)
    });
  }


  loadCarreras(): void {
    this.formatoFecha();
    this.carreraService.carreraXperiodo(this.selectedPeriodo?.idPeriodoAc ?? 0).subscribe(response => {
      this.carreras = response;
      if (this.selectedPeriodo?.idPeriodoAc === undefined) {
        console.error("No se pudo obtener idPeriodoAc porque selectedObj es nulo o indefinido.");
      } else {
        console.log("ID Periodo: " + this.selectedPeriodo.idPeriodoAc);
      }

    })
  }

  loadAsignaturas(): void {
    this.formatoFecha();
    this.asignaturaService.asignaturaXCarreara(this.selectedCarrera?.idCarrera ?? 0).subscribe(response => {
      this.asignaturas = response;
      console.log("ID Carrera: " + this.selectedCarrera?.idCarrera);
    })
  }

  loadPeriodos(): void {
    this.periodoAcService.getPeriodosAcs().subscribe(response => {
      this.periodosAc = response;
    })
  }


  formatoFecha() {
    if (this.selectedPeriodo?.idPeriodoAc !== undefined) {
      this.selectedPeriodo.descripcion = this.selectedPeriodo.fechaInicio.toString().slice(0, 7) + "/" + this.selectedPeriodo.fechaFin.toString().slice(0, 7)
    }
  }

  loadCriterios() {
    this.criteServi.obtenerListacriterios().subscribe((datos) => {

      this.criterios = datos;

    });

  }

  reportGeneral() {
    if (this.selectedCarrera?.idCarrera !== undefined && this.selectedPeriodo?.idPeriodoAc !== undefined && this.selectedAsignatura?.idAsignatura !== undefined) {
      this.aulaServi.graficaAula(0, 0, 0, this.selectedCarrera?.idCarrera, this.selectedPeriodo?.idPeriodoAc).subscribe((datos) => {
        this.grafiCiclos = datos
        this.initChart();
        this.grafiCM();
        //cargar id para filtrar el los criterios 
        this.detServi.idReportCrite(this.selectedCarrera?.idCarrera, this.selectedPeriodo?.idPeriodoAc).subscribe((datos) => {

          this.filterIdCriterio = datos;
          this.grafiCrite();
        });
      });
    } else {
      return
    }


  }

  initChart() {
    let labelCiclo: string[] = [];
    for (let index = 0; index < this.grafiCiclos.length; index++) {
      let cicloName = ""
      cicloName = this.grafiCiclos[index].aula.cicloPertenece
      labelCiclo.push(cicloName);
    }
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Inicializa completeData antes de agregar elementos a datasets
    this.basicData = {
      labels: [this.selectedCarrera?.nombreCarrera],
      datasets: []
    };

    for (let index = 0; index < this.grafiCiclos.length; index++) {
      let labelData: number[] = [];
      //color aleatorio
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      //recuperar datos 
      labelData.push(this.grafiCiclos[index].total_c);

      let chartDataArray = {
        label: this.grafiCiclos[index].aula.cicloPertenece,
        data: labelData,
        backgroundColor: Array(4).fill(`rgba(${r}, ${g}, ${b}, 0.2)`),
        borderColor: Array(4).fill(`rgb(${r}, ${g}, ${b})`),
        borderWidth: 1
      };

      this.basicData.datasets.push(chartDataArray)
    }

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
  ////////////////////////////////////////////////////////////////////////
  codigoPeriodoAc: number = 0;
  fetchChartData() {
    this.docenteService.obtenerDatos(0, 0, 0, this.codigoPeriodoAc).subscribe((dataDocente: GraficaDocente[]) => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      // Inicializar los datos de las barras
      const datasets: { label: string, backgroundColor: string, data: { x: number, y: string }[] }[] = [];

      // Iterar sobre los datos de los docentes
      for (let i = 0; i < dataDocente.length; i++) {
        const docente = dataDocente[i];
        const data: { x: number, y: string }[] = [
          { x: docente.porc_C, y: docente.docente.usuPerId.perNombre1 },
          { x: docente.porc_CM, y: docente.docente.usuPerId.perNombre1 },
          { x: docente.porc_NC, y: docente.docente.usuPerId.perNombre1 }
        ];

        const dataset: { label: string, backgroundColor: string, data: { x: number, y: string }[] } = {
          label: docente.docente.usuPerId.perNombre1,
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          data: data
        };

        datasets.push(dataset);
      }

      this.data = {
        datasets: datasets
      };

      this.options = {
        indexAxis: 'y', // Establece el eje Y como el eje de las categorías
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
        elements: {
          bar: {
            borderWidth: 1, // Hace las barras más delgadas
            borderColor: 'rgba(0, 0, 0, 0.1)' // Cambia el color del borde de las barras
          }
        }
      };
    });
  }







  grafiCM() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.dataCM = {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Ciclo1',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Ciclo2',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.optionsCM = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
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


  grafiCrite() {

    let labelDataNumber: number[] = []
    let labelDataString: string[] = []

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.dataCrite = {
      labels: labelDataString,
      datasets: [
        {
          label: 'Cumplimiento por criterio',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: labelDataNumber
        }
      ]
    };

  
    let evaDetTem: EvaluacionDet[] = [];
    let porcentajeTem: number[] = [];
    let numDivPorcen:1;
    let numDiviBande:number[]=[];
    console.log(this.filterIdCriterio,"criterio para filtrar")
    for (let index = 0; index < this.evaDet.length; index++) {

      //filtro los criterios que solo pertencen a este periodo y carrera
      if (this.filterIdCriterio.includes(this.evaDet[index].secCalificacion)) {

        evaDetTem.push(this.evaDet[index]);
      }
    }

    // filtro si hay nombres repetidos 
    for (let index = 0; index < evaDetTem.length; index++) {
      if (!labelDataString.includes(evaDetTem[index].criterio?.clasificacion?.nombreClasificacion ?? 'Criterio')) {
        labelDataString.push(evaDetTem[index].criterio?.clasificacion?.nombreClasificacion ?? 'Criterio')
        porcentajeTem.push(0)
        numDiviBande.push(0);
      }
    }

  
    //juntar los nombres iguales 
    for (let j = 0; j < labelDataString.length; j++) {

      for (let index = 0; index < evaDetTem.length; index++) {

        if(labelDataString[j]===evaDetTem[index].criterio?.clasificacion?.nombreClasificacion){
         
          if(evaDetTem[index].calificacion.codCalificacion==='CM'){

            porcentajeTem[j]+=50
            numDiviBande[j]+=1
          }else if(evaDetTem[index].calificacion.codCalificacion==='C'){
            porcentajeTem[j]+=100
            numDiviBande[j]+=1
          }else{
            porcentajeTem[j]+=0
            numDiviBande[j]+=1
          }
        }
      }
    }
    console.log(porcentajeTem,"total para dividir")
    console.log(numDiviBande,"porque debe dividir")

    for (let index = 0; index < porcentajeTem.length; index++) {
      labelDataNumber.push(porcentajeTem[index]/numDiviBande[index])
      
    }
    /*numDivPorcen=evaDetTem.length/labelDataString.length 
    if(numDivPorcen!==1){

      for (let index = 0; index < porcentajeTem.length; index++) {
        labelDataNumber.push(porcentajeTem[index]/numDivPorcen)
        
      }


    }else{
      for (let index = 0; index < porcentajeTem.length; index++) {
          
        labelDataNumber.push(porcentajeTem[index])
      }
    }*/


    this.optionsCrite = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
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

  @ViewChild('contenidoPDF', { static: false }) contenidoPDF: ElementRef<any> | undefined;
 

  
  generatePDF() {
    // Obtener los elementos HTML que deseas convertir en imágenes de lienzo
    const contentElement1 = document.getElementById('contenidoPDF');
    const grafiTres = document.getElementById('grafiTres');
    const grafiFour = document.getElementById('grafiFour');
    // Verificar si se encontraron los elementos
    if (contentElement1 && grafiTres && grafiFour) {
      // Crear un objeto jsPDF con formato A4 y márgenes
      const doc = new jsPDF('p', 'mm', 'a4'); // 'p' para orientación de retrato, 'a4' para tamaño A4
  
      // Definir los márgenes
      const margin = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      };
  
      // Capturar el contenido de los elementos HTML en imágenes de lienzo
      Promise.all([
        html2canvas(contentElement1),
        html2canvas(grafiTres),
        html2canvas(grafiFour)
      ]).then(canvases => {
        // Procesar cada imagen de lienzo capturada
        canvases.forEach((canvas, index) => {
          // Obtener la URL de la imagen generada
          const imgData = canvas.toDataURL('image/png');
  
          // Calcular la altura de la imagen para que se ajuste al ancho del documento con los márgenes
          const imgWidth = doc.internal.pageSize.getWidth() - margin.left - margin.right;
          const imgHeight = canvas.height * imgWidth / canvas.width;
  
          // Añadir la imagen al documento PDF
          doc.addImage(imgData, 'PNG', margin.left, margin.top, imgWidth, imgHeight);
  
          // Agregar una nueva página si no es la última imagen
          if (index < canvases.length - 1) {
            doc.addPage();
          }
        });
        
        doc.rect(46, 240, 130, 45);
        doc.line(46,247,176,247);
        doc.line(46,278,176,278);
        doc.line(90,247,90,278)
        // Guardar el documento PDF
        doc.save('documento.pdf');
      });
    } else {
      console.error('Uno o ambos elementos no fueron encontrados.');
    }
  }
}
