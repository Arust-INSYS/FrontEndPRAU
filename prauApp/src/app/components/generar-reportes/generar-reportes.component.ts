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

@Component({
  selector: 'app-generar-reportes',
  templateUrl: './generar-reportes.component.html',
  styleUrl: './generar-reportes.component.css'
})
export class GenerarReportesComponent {
  selectedPeriodo: any;
  selectedCarrera: any;
  selectedAsignatura: any;
  criterios:Criterios[]=[];
  periodosAc: PeriodoAc[] = [];
  carreras: IConsultarCarrera[] = [];
  asignaturas: IAsignaturaXCarrera[] = [];
  userId!: bigint;
  infoUser: any;
  ahora = new Date();
  fecha:string=""

  constructor(private periodoAcService: PeriodoAcService, private carreraService: CarreraService, private asignaturaService: AsignaturaService, private localStorage: LocalStorageService, private usurioService: UsuarioService, private criteServi:CriteriosService) {

  }

  ngOnInit(): void {
    let dia = this.ahora.getDate();
    let mes = this.ahora.getMonth() + 1; // Sumamos 1 porque los meses comienzan desde 0
    let año = this.ahora.getFullYear();
    this.fecha= dia+"/"+mes+"/"+año+""

    this.userId = BigInt(this.localStorage.getItem('userId') as unknown as bigint);
    const id: number = Number(this.userId);
    this.usurioService.buscarNombreUsuario(id).subscribe(data => {
      this.infoUser = data;

    });
    this.loadPeriodos();
    this.loadCarreras();
    this.loadAsignaturas();
    this.loadCriterios();
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

  reportGeneral() {
    if (this.selectedCarrera?.idCarrera !== undefined && this.selectedPeriodo?.idPeriodoAc !== undefined && this.selectedAsignatura?.idAsignatura !== undefined) {

    } else {
      return
    }


  }

  formatoFecha() {
    if (this.selectedPeriodo?.idPeriodoAc !== undefined) {
      this.selectedPeriodo.descripcion = this.selectedPeriodo.fechaInicio.toString().slice(0, 7) + "/" + this.selectedPeriodo.fechaFin.toString().slice(0, 7)
    }
  }

  loadCriterios(){
    this.criteServi.obtenerListacriterios().subscribe((datos)=>{
      
      this.criterios=datos;


    });

  }
  
 
  @ViewChild('contenidoPDF', { static: false }) contenidoPDF: ElementRef<any> | undefined;


  generatePDF() {
    // Obtener el contenido HTML que deseas convertir en PDF
    const content: HTMLElement = this.contenidoPDF?.nativeElement;

    // Crear un objeto jsPDF con formato A4 y márgenes
    const doc = new jsPDF('p', 'mm', 'a4'); // 'p' para orientación de retrato, 'a4' para tamaño A4

    // Definir los márgenes
    const margin = {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20
    };

    // Convertir el contenido HTML en una imagen utilizando html2canvas
    html2canvas(content).then(canvas => {
      // Obtener la URL de la imagen generada
      const imgData = canvas.toDataURL('image/png');

      // Calcular la altura de la imagen para que se ajuste al ancho del documento con los márgenes
      const imgWidth = doc.internal.pageSize.getWidth() - margin.left - margin.right;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      // Añadir la imagen al documento PDF
      doc.addImage(imgData, 'PNG', margin.left, margin.top, imgWidth, imgHeight);

      // Guardar el documento PDF
      doc.save('documento.pdf');
    });
  }
}
