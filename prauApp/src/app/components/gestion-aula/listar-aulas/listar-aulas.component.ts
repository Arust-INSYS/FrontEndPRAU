import { Component, OnInit, ViewChild } from '@angular/core';
import { Aula } from '../../../models/aula';
import { AulaService } from '../../../services/aula.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { PDFDocument, rgb } from 'pdf-lib';
import { Asignatura } from '../../../models/asignatura';



@Component({
  selector: 'app-listar-aulas',
  templateUrl: './listar-aulas.component.html',
  styleUrl: './listar-aulas.component.css'
})
export class ListarAulasComponent implements OnInit {

  // @ViewChild('dt', { static: true }) table!: Table;
  // @ViewChild('dt2') dt2!: Table;

  
  selectedAulas!: Aula[];

  //representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  searchTerm: string = '';

  aulas: Aula[]=[];
  originalAulas: Aula[]=[];
  constructor(private aulaService:AulaService, 
       private router: Router,) { }

  // displayModalregsitro: boolean = false;
  // displayModalactualizar: boolean = false;
  aulaId:number = 0;

  ngOnInit()  {

    this.aulaService.getAulas().subscribe((data)=>{
     console.log(data);
      this.aulas= data;
      this.originalAulas = data;
    
  });
  
}


onSearch(event: any) {
  let filteredAulas = [];

  if(event.target.value) { // Si el campo de búsqueda no está vacío
    for(let aula of this.aulas) {
      let aulaStr = JSON.stringify(aula).toLowerCase();
      if(aulaStr.includes(event.target.value.toLowerCase())) {
        filteredAulas.push(aula);
       
      }
    }
    this.aulas = filteredAulas; // Actualiza la lista de aulas con los resultados filtrados
  } else {
    this.aulas = [...this.originalAulas]; // Si el campo de búsqueda está vacío, restablece la lista de aulas a su estado original
  }
}


selectAula(aula: Aula) {
  //this.displayModalactualizar = true;
  console.log(aula)
  this.router.navigate(['/menu/contenido-virtual/actualizar-aula', aula.aulaId]);
}

eliminarAulaConfirmado(id: number) {
  Swal.fire({
    title: '¿Estás seguro de eliminar este periodo académico?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminarlo'
  }).then((result) => {
    if (result.isConfirmed) {
      this.aulaService.eliminarAula(id).subscribe(() => {
        // Actualizar la lista de periodos después de la eliminación
       
        this.aulas = this.aulas.filter(aula => aula.aulaId !== id);
        Swal.fire(
          '¡Eliminado!',
          'El Aula ha sido eliminado correctamente.',
          'success'
        );
        
        
      }, error => {
       // console.error('Error al eliminar Aula:', error);
        Swal.fire(
          'Error',
          'Ha ocurrido un error al eliminar Aula.',
          'error'
        );
      });
    }
    this.router.navigate(['/menu/contenido-virtual/listar-aulas']);
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
    page.drawText('Lista de Aulas', {
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
    const SizeColumn = [20, 40, 40, 100, 100, 100, 100];
    const colorlineas = rgb(0.5, 0.5, 0.5);
    const colorencabezado = rgb(0, 0.1, 1);

    // Encabezados de la tabla
    const headers = ['ID', 'Aula', 'Ciclo', 'Periodo Academico', 'Docente', 'Asignatura', 'Observaciones'];
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
    for (let i = 0; i < this.aulas.length; i++) {
        const dato = this.aulas[i];
        const rowData = [
          dato.aulaId?.toString() || '', // Manejar valores null
          dato.aulaNombre || '',
          dato.cicloPertenece || '',
          dato.periodoAc.nombrePeriodo || '',
          dato.docente.usuPerId.perNombre1 || '' + dato.docente.usuPerId.perApellido1 || '',
          dato.asignatura.nombreAsignatura || '',
          dato.observaciones || '',
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

}
