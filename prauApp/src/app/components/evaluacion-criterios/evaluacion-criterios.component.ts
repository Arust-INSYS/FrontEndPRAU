import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EvaluacionCab } from '../../models/evaluacionCab';
import { EvaluacionCabService } from '../../services/evaluacionCab.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../services/sharedData.service';
import { Usuario } from '../../models/usuario';
import { Aula } from '../../models/aula';
import { AulaService } from '../../services/aula.service';
import { UsuarioService } from '../../services/usuario.service';
import { CarreraService } from '../../services/carrera.service';
import Swal from 'sweetalert2';
import { PDFDocument, rgb } from 'pdf-lib';
import { IExcelReportParams, IHeaderItem } from '../../interface/IExcelReportParams';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-evaluacion-criterios',
  templateUrl: './evaluacion-criterios.component.html',
  styleUrl: './evaluacion-criterios.component.css'
})
export class EvaluacionCriteriosComponent {
  @ViewChild('dt', { static: true }) table!: Table;
  searchTerm: string = '';
  items: MenuItem[] | undefined;
  $even: any;
  $odd: any;
  Delete: string | undefined;

  status: string = "";

  dt: any;

  showModal() {
    throw new Error('Method not implemented.');
  }

  displayModal: boolean = false;
  evaluacionCa: EvaluacionCab = new EvaluacionCab();
  evaluacionCab: EvaluacionCab[] = [];
  nombreCurso: string = ''; // Variable para almacenar el nombre del curso seleccionado
  nombreDocente: string = ''; // Variable para almacenar el nombre del docente asociado al curso seleccionado
  usuario: Usuario[] = [];
  docentes: any[] = [];
  cursos: any[] = [];
  carrera: any[] = [];
  docenteSeleccionado: number | null = null; // Almacenará el ID del docente seleccionado
  cursoSeleccionado: number = 0; // Almacenará el ID del curso seleccionado
  idAulaSeleccionada: number | null = null;
  //nro evaluacion
  nroEvaluacion: number = 0;
  estado: number = 1;// este es el estado establecido
  customers: any
  selectedCustomers: any
  loading: any

  estadoBTN: number = 1;
  //
  excelReportData: IExcelReportParams | null = null;


  constructor(private evaluacionCABService: EvaluacionCabService,
    private usuarioService: UsuarioService,
    private aulaService: AulaService,
    private router: Router,
    private toastr: ToastrService,
    private sharedDataService: SharedDataService,
    private carreraService: CarreraService,
    private excelService: ExcelService
  ) { }


  ngOnInit(): void {
    this.estadoBTN = 1;
    this.getFiltroEvaCap();
    // this.listarevalu();


  }
  //listarevalu() {
  //this.usuarioService.getUsersByRoleId(4).subscribe((res) => {
  //this.docentes = res;
  //    console.log(this.docentes);
  //  });
  //}

  cargarEvaluacion(id: number) {
    this.evaluacionCABService.findNroEvaluacion(id).subscribe(
      response => {
        this.evaluacionCa = response;
      },
      error => {
        console.error('Error al cargar la calificacion:', error);
      }
    );
  }

  obtenerNroEva(): void {
    this.evaluacionCABService.nroEvaluacionNew().subscribe(eva => {
      this.nroEvaluacion = eva;
    })
  }

  async listarcarrer() {
    await this.carreraService.obtenerListaCarreras().subscribe((res: any[]) => {
      this.carrera = res.map((doc) => ({
        label: doc.perNombre1,
        value: doc.usuId,
      }));
    });
  }

  async listarevalu() {
    await this.usuarioService.getUsersByRoleId(4).subscribe((res: any[]) => {
      this.docentes = res.map((doc) => ({
        label: doc.perNombre1,
        value: doc.usuId,
      }));
    });
  }

  recibirID(numero: number) {
    console.log(numero, 'Id Recibido')
  }
  onDocenteSeleccionado(selectedDocente: any) {
    // Aquí puedes realizar el cálculo o cualquier otra acción necesaria
    console.log('Docente seleccionado:', selectedDocente);
    this.listarcursos(selectedDocente);
    this.evaluacionCa.evaluador!.usuId = selectedDocente;
  }


  async listarcursos(docenteId: number) {
    await this.aulaService.getAulasPorUsuario(docenteId).subscribe((aulas: any[]) => {
      this.cursos = aulas.map((doc) => ({
        label: doc.aulaNombre,
        value: doc.aulaId,
      }));
    });
  }
  onCursoSeleccionado(selectedCurso: any) {
    // Aquí puedes realizar el cálculo o cualquier otra acción necesaria
    console.log('Docente seleccionado:', selectedCurso);
    this.evaluacionCa.aulaEva!.aulaId = selectedCurso;
    //console.log('Este es el mensaje',this.evaluacionCa.aula)
  }

  cargarInformacionCurso(): void {
    // Verificar que haya un curso seleccionado
    if (this.cursoSeleccionado) {
      // Asignar el ID del curso seleccionado a la variable idAulaSeleccionada
      this.idAulaSeleccionada = this.cursoSeleccionado;
    } else {
      // Reiniciar el ID del curso seleccionado si no hay ninguno seleccionado
      this.idAulaSeleccionada = null;
    }
  }

  getEvaluacionesCAB(est: number): void {
    this.searchTerm = '';
    this.estadoBTN = est;
    this.evaluacionCABService.getEvaluacionCAB(est).subscribe((dato) => {
      this.evaluacionCab = dato;
      //this.generarPDF();
    },
      error => {
        console.error('Error al obtener los criterios: ', error);
      }
    );
  }


  getFiltroEvaCap(): void {
    //  = this.estadoBTN;
    this.evaluacionCABService.getFiltroEvaCap(this.estadoBTN, this.searchTerm).subscribe((dato) => {
      this.evaluacionCab = dato;
      // console.log(dato)
      this.loadExcelReportData(this.evaluacionCab);
      //this.generarPDF();
    },
      error => {
        console.error('Error al obtener los criterios: ', error);
      }
    );
  }

  filtrar() {
    this.table.filter(this.searchTerm, 'aulaEva.docente.usuPerId.perNombre1', 'contains'); // Aplicar el filtro global
  }

  crearNuevoDato(status: string) {
    this.router.navigate(['/menu/contenido-criterios/criterios-evaluacion-calificacion', this.status]);

  }

  actualizarCriterio(id: number, status: string) {
    this.router.navigate(['/menu/contenido-criterios/criterios-evaluacion-calificacion', status, id]);
  }

  // Método para eliminar un criterio
  eliminarCriterio(id: number, est: number) {
    let mensaje;
    if (est === 0) {
      mensaje = 'eliminar'
    } else {
      mensaje = 'activar'
    }
    Swal.fire({
      title: `¿Está seguro de que desea ${mensaje} la evaluacion?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${mensaje}`,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluacionCABService.updateEstado(id, est).subscribe({
          next: () => {
            this.cargarEvaluacion(est)
            this.estado = est;
            if (est === 0) {
              this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
            } else {
              this.toastr.success('ACTIVADO CORRECTAMENTE', 'ÉXITO');
            }
            this.getEvaluacionesCAB(est)
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => {
            // Manejar completado
          }
        });
      }
    });
  }
  // Método para dividir la descripción en líneas más cortas
  splitDescriptionIntoLines(description: string, maxWidth: number, fontSize: number): string[] {
    const words = description.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const width = this.getTextWidth(currentLine + word, fontSize); // Calcular el ancho del texto actual

      if (width <= maxWidth) {
        // Si la palabra cabe en la línea actual, añádela
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        // Si la palabra no cabe, añade la línea actual al array de líneas y comienza una nueva línea
        lines.push(currentLine);
        currentLine = word;
      }
    }

    // Añadir la última línea
    if (currentLine !== '') {
      lines.push(currentLine);
    }

    return lines;
  }

  getTextWidth(text: string, fontSize: number): number {
    // Calcular el ancho del texto según su longitud y el tamaño de la fuente
    return text.length * (fontSize * 0.5); // Ajusta según sea necesario
  }

  async generarPDFtable() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([700,400]);

    // Agregar imagen
    const imageBytes = await fetch('../../../assets/LOGO-RECTANGULAR.png').then(res => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);
    page.drawImage(image, {
      x: 210, // Posición x de la imagen
      y: 350, // Posición y de la imagen
      width: 180, // Ancho de la imagen
      height: 40 // Alto de la imagen
    });

    // Título de la tabla
    page.drawText('Lista de Evaluaciones', {
      x: 250,
      y: 335,
      size: 15,
      color: rgb(0, 0, 0),
    });

    // Definir el tamaño y la posición de la tabla
    const startX = 30;
    let startY = 150;
    const cellPadding = 8;

    // Definir las propiedades de las celdas
    const fontSize = 9;
    const SizeColumn = [20, 150, 100, 150,50];
    const colorlineas = rgb(0.5, 0.5, 0.5);
    const colorencabezado = rgb(0, 0.1, 1);

    // Encabezados de la tabla
    const headers = ['No.', 'Aula', 'Docente', 'Observaciones', '% Cumplido'];
    const headersCellWidth = SizeColumn;
    const rowHeight = 20;
    const tableHeight = 200;

    // Dibujar encabezados y líneas horizontales
    for (let i = 0; i < headers.length; i++) {
      page.drawText(headers[i], {
        x: startX + headersCellWidth.slice(0, i).reduce((acc, width) => acc + width + cellPadding, 2),
        y: startY + tableHeight - rowHeight - 20 + cellPadding,
        size: fontSize,
        color: colorencabezado,
      });
    }

    const dataCellWidths = SizeColumn; // Ancho de las celdas de datos
    // Llenar la tabla con los datos
    for (let i = 0; i < this.evaluacionCab.length; i++) {
      const dato = this.evaluacionCab[i];
      const rowData = [
        dato.nroEvaluacion?.toString() || '', // Manejar valores null
        dato.aulaEva?.aulaNombre || '',
        dato.aulaEva?.docente.usuPerId.perNombre1 || '',
        dato.aulaEva?.observaciones || '',
        dato.porcTotalC?.toString() || '',
      ];
      // Calcular la altura máxima de la fila
      let maxHeight = 0;
      for (let j = 0; j < rowData.length; j++) {
        const lines = rowData[j].length / (dataCellWidths[j] / (fontSize * 0.55));
        const textHeight = lines * (fontSize * 0.30); // Ajustar según sea necesario
        maxHeight = Math.max(maxHeight, textHeight);

      }
      // Dibujar los datos de la fila y las líneas horizontales
      for (let j = 0; j < rowData.length; j++) {
        const cellX = startX + dataCellWidths.slice(0, j).reduce((acc, width) => acc + width + cellPadding, 2);
        const cellY = startY + tableHeight - (i + 2.8) * rowHeight + cellPadding + maxHeight - fontSize * 0.85;
        const cellWidth = dataCellWidths[j] - 2 * cellPadding;

        // Dibujar texto
        if (j < 7) { // Si es la celda de descripción
          const descriptionLines = this.splitDescriptionIntoLines(rowData[j], cellWidth, fontSize);
          for (let k = 0; k < descriptionLines.length; k++) {
            page.drawText(descriptionLines[k], {
              x: cellX,
              y: cellY - k * (fontSize * 0.95),
              size: fontSize,
              color: rgb(0, 0, 0),
              maxWidth: cellWidth,
            });
          }
        } else { // Para otras celdas
          page.drawText(rowData[j], {
            x: cellX,
            y: cellY,
            size: fontSize,
            color: rgb(0, 0, 0),
            maxWidth: cellWidth,
          });
        }

        // Dibujar líneas verticales entre las columnas
        if (j < rowData.length - 1) {
          const nextCellX = startX + dataCellWidths.slice(0, j + 1).reduce((acc, width) => acc + width + cellPadding, - 8);
          const lineYStart = cellY + 30;
          const lineYEnd = cellY - maxHeight - 30;
          page.drawLine({
            start: { x: nextCellX, y: lineYStart },
            end: { x: nextCellX, y: lineYEnd },
            thickness: 1,
            color: colorlineas
          });
        }
      }
      // Dibujar líneas horizontales entre las filas
      page.drawLine({
        start: { x: startX, y: startY - (i - 8) * rowHeight },
        end: { x: startX + 60 + dataCellWidths.reduce((acc, width) => acc + width, 0), y: startY - (i - 8) * rowHeight },
        thickness: 1.5,
        color: colorlineas
      });
      startY -= maxHeight + cellPadding;
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');
  }


  loadExcelReportData(data: EvaluacionCab[]) {
    //NOMBRE DEL REPORTE
    const reportName = 'Evaluaciones';

    //TAMAÑO DEL LOGO
    const logo = 'G1:J1';

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: '№' },
      { header: 'FECHA' },
      { header: 'IDENT. EVALUADOR' },
      { header: 'EVALUADOR' },
      { header: 'AULA' },
      { header: 'IDENT. DOCENTE' },
      { header: 'DOCENTE' },
      { header: 'ASIGANTURA' },
      { header: 'CICLO' },
      { header: 'CARRERA' },
      { header: 'PERIODO ACADEMICO' },
      { header: '% PROGRESO' },
      { header: 'CUMPLE' },
      { header: '% CUMPLE' },
      { header: 'CUMPLE MEDIANAMENTE' },
      { header: '% CUMPLE MEDIANAMENTE' },
      { header: 'NO CUMPLE' },
      { header: '% NO CUMPLE' },
    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      nro: item.nroEvaluacion || 0,
      fecha: item.fechaRegistro
        ? new Date(new Date(item.fechaRegistro).getTime() + new Date(item.fechaRegistro).getTimezoneOffset() * 60000).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')
        : '' || '',
      identEva: item.evaluador?.usuPerId.perCedula || '',
      evaluador: `${item.evaluador?.usuPerId.perApellido1 || ''} ${item.evaluador?.usuPerId.perApellido2 || ''} ${item.evaluador?.usuPerId.perNombre1 || ''} ${item.evaluador?.usuPerId.perNombre2 || ''}`.trim(),
      aula: item.aulaEva.aulaNombre,
      identDoc: item.aulaEva.docente.usuPerId.perCedula || '',
      docente: `${item.aulaEva.docente?.usuPerId.perApellido1 || ''} ${item.aulaEva.docente?.usuPerId.perApellido2 || ''} ${item.aulaEva.docente?.usuPerId.perNombre1 || ''} ${item.aulaEva.docente?.usuPerId.perNombre2 || ''}`.trim(),
      asig: item.aulaEva.asignatura.nombreAsignatura || '',
      ciclo: item.aulaEva.cicloPertenece,
      carrera: item.aulaEva.asignatura.carrera?.nombreCarrera || '',
      per: item.aulaEva.periodoAc.nombrePeriodo,
      progreso: item.progreso + '%' || '0%',
      cc: item.totalC || 0,
      porcCC: item.porcTotalC + '%' || '0%',
      cm: item.porcTotalCm,
      porcCM: item.porcTotalCm + '%' || '0%',
      nc: item.totalNc,
      porcNC: item.porcTotalNc + '%' || '0%'
    }));

    if (this.excelReportData) {
      this.excelReportData.logo = logo;
      this.excelReportData.rowData = rowData;
      this.excelReportData.headerItems = headerItems;
      this.excelReportData.reportName = reportName;
    } else {
      this.excelReportData = {
        logo,
        rowData,
        headerItems,
        reportName,
      };
    }
  }

  //PASO 3
  //metodo para el boton dew descarga
  downloadExcel(): void {
    if (this.excelReportData) {
      this.excelService.dowloadExcel(this.excelReportData);
    }
    //PASO 4 colocar metodo listar objeto
    this.getFiltroEvaCap();
  }

}