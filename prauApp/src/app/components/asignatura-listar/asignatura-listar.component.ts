import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PDFDocument, rgb } from 'pdf-lib';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { Asignatura } from '../../models/asignatura';
import { AsignaturaService } from '../../services/asignatura.service';
import { ExcelService } from '../../services/excel.service';
import { IExcelReportParams, IHeaderItem } from '../../interface/IExcelReportParams';

@Component({
  selector: 'app-asignatura-listar',
  templateUrl: './asignatura-listar.component.html',
  styleUrls: ['./asignatura-listar.component.css']
})
export class AsignaturaListarComponent {

  @ViewChild('dt', { static: true }) table!: Table;
  searchTerm: string = '';
  asignaturas: Asignatura[] = [];
  items: MenuItem[] | undefined;
  asignatura: Asignatura[] = [];
  excelReportData: IExcelReportParams | null = null;

  constructor(private asignaturaService: AsignaturaService, 
    private router: Router,
    private excelService: ExcelService,
  ) {}

  ngOnInit(): void {
    this.obtenerAsignaturas();
  }

  applyGlobalFilter() {
    this.table.filter(this.searchTerm, 'nombreAsignatura', 'contains'); // Aplicar el filtro global
  }

  obtenerAsignaturas() {
    this.asignaturaService.obtenerListaAsignaturas().subscribe(data => {
      this.asignaturas = data;
      this.loadExcelReportData(this.asignaturas);
    });
  }

  actualizarAsignatura(id: number) {
    this.router.navigate(['/menu/contenido-virtual/asignatura-actualizar', id]);
  }

  redirectToAsignatura() {
    this.router.navigate(['/menu/contenido-virtual/asignatura']);
  }

  eliminarAsignatura(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Desea eliminar la asignatura?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignaturaService.eliminarAsignatura(id).subscribe(() => {
          this.obtenerAsignaturas(); 
          Swal.fire(
            '¡Eliminado!',
            'La asignatura ha sido eliminada.',
            'success'
          );
        }, error => {
          console.error('Error al eliminar la asignatura:', error);
          Swal.fire(
            'Error',
            'Error al eliminar asignatura: Está vinculada con una carrera.',
            'error'
          );
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

downloadExcel(): void {
  if (this.excelReportData) {
    this.excelService.dowloadExcel(this.excelReportData);
  }
  //PASO 4 colocar metodo listar objeto
  this.obtenerAsignaturas();
}





  async generarPDFtable() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Agregar imagen
    const imageBytes = await fetch('../../../assets/LOGO-RECTANGULAR.png').then(res => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);
    page.drawImage(image, {
        x: 210, // Posición x de la imagen
        y: 780, // Posición y de la imagen
        width: 180, // Ancho de la imagen
        height: 40 // Alto de la imagen
    });

    // Título de la tabla
    page.drawText('Lista de Asignaturas', {
        x: 250,
        y: 750,
        size: 15,
        color: rgb(0, 0, 0),
    });

    // Definir el tamaño y la posición de la tabla
    const startX = 30;
    let startY = 550;
    const cellPadding = 8;

    // Definir las propiedades de las celdas
    const fontSize = 9;
    const SizeColumn = [20, 150, 150, 150];
    const colorlineas = rgb(0.5, 0.5, 0.5);
    const colorencabezado = rgb(0, 0.1, 1);

    // Encabezados de la tabla
    const headers = ['ID', 'Asignatura', 'Descripcion', 'Carrera'];
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
    for (let i = 0; i < this.asignaturas.length; i++) {
        const dato = this.asignaturas[i];
        const rowData = [
          dato.idAsignatura?.toString() || '', // Manejar valores null
          dato.nombreAsignatura || '',
          dato.descripcionAsignatura || '',
          dato.carrera?.nombreCarrera || '',
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
            end: { x: startX  + 60+ dataCellWidths.reduce((acc, width) => acc + width, 0), y: startY - (i - 8) * rowHeight },
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

 //EXCEL
  ///cargar data en el excel
  //cambiar el tipo de dato de la lista
  //PASO2
  loadExcelReportData(data: Asignatura[]) {
    //NOMBRE DEL REPORTE
    const reportName = 'asignatura';

    //TAMAÑO DEL LOGO
    const logo = 'G1:J1';

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
     // { header: '№ REGISTRO' },
      
      { header: 'ID ASIGNATURA' },
      { header: 'NOMBRE ASIGNATURA' },
      { header: 'DESCRIPCION ASIGNATURA' },
      
     
    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      idAsi: item?.idAsignatura,
      // foto: item.foto,
      noma: item?.nombreAsignatura,
      desa: item?.descripcionAsignatura,
      
    
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






}
