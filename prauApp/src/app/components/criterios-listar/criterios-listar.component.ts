import { Component, ViewChild } from '@angular/core';
import { Criterios } from '../../models/criterios';
import { CriteriosService } from '../../services/criterios.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ClasificacionCriterios } from '../../models/clasificacion-criterios';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';
import { AuthRolService } from '../../services/authRolService.service';

import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { DataSource } from '@angular/cdk/collections';
import { color } from 'html2canvas/dist/types/css/types/color';


@Component({
  selector: 'app-criterios-listar',
  templateUrl: './criterios-listar.component.html',
  styleUrl: './criterios-listar.component.css'
})

export class CriteriosListarComponent {

  @ViewChild('dt', { static: true }) table!: Table; 
  searchTerm: string = '';
  items: MenuItem[]|undefined;
$even: any;
$odd: any;
Delete: string|undefined;

dt: any;

isAdmin: boolean =  false;

showModal() {
throw new Error('Method not implemented.');
}
applyFilter() {
  this.table.filter(this.searchTerm, 'nombreCriterio', 'contains'); 
}
  displayModal: boolean = false;
  clasificacioncriterio:ClasificacionCriterios = new ClasificacionCriterios();
  criterios:Criterios = new Criterios();
  criterio: Criterios[] = [];
  customers: any
  selectedCustomers:any
  loading:any

  constructor(private criteriosService: CriteriosService, private router: Router,private toastr: ToastrService, private authRolService: AuthRolService) {}

  ngOnInit(): void {
    this.obtenerCriterios();
    this.authRolService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
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

  obtenerCriterios() {
    this.criteriosService.obtenerListacriterios().subscribe(dato => {
      this.criterio = dato;
    },
    error => {
      console.error('Error al obtener los criterios: ', error);
    }
    );
  }
  applyGlobalFilter() {
    this.table.filter(this.searchTerm, 'nombreCriterio', 'contains'); // Aplicar el filtro global
  }
  actualizarCriterio(id: number) {
    this.router.navigate(['menu/contenido-criterios/criterios-actualizar', id]); // Redirigir a la ruta de actualización con el ID del criterio
}
  redirectToCriterios() {
    this.router.navigate(['/menu/contenido-criterios/criterios']);
  }
  eliminarCriterio(id: number) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este criterio?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.criteriosService.eliminarcriterios(id).subscribe(() => {
          this.obtenerCriterios(); 
          Swal.fire(
            '¡Eliminado!',
            'El criterio ha sido eliminado correctamente.',
            'success'
          );
        }, error => {
          console.error('Error al eliminar el criterio:', error);
          Swal.fire(
            'Error',
            'Ha ocurrido un error al eliminar el criterio.',
            'error'
          );
        });
      }
    });
  }


  async generarPDF() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 600]);

    // Agregar imagen
    const imageBytes = await fetch('../../../assets/LOGO-RECTANGULAR.png').then(res => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);
    page.drawImage(image, {
      x: 110, // Posición x de la imagen
      y: 550, // Posición y de la imagen
      width: 180, // Ancho de la imagen
      height: 40 // Alto de la imagen
    });
  
    page.drawText('Lista de Criterios:', {
      x: 138,
      y: 500,
      size: 16,
      color: rgb(0, 0, 0),
    });
  
    let yPosition = 450;
    this.criterio.forEach((dato: any) => {
      page.drawLine({ start: { x: 50, y: yPosition+20 }, end: { x: 350, y: yPosition+20 }, color: rgb(0, 0, 0) });
      const keys = Object.keys(dato);
      keys.forEach(key => {
        const value = dato[key];
        if (key === 'clasificacion' && typeof value === 'object') {
 
          const clasificacionNombre = value.nombreClasificacion || 'Sin clasificación';
          page.drawText(`Clasificación: \t${clasificacionNombre}`, {
            x: 50,
            y: yPosition,
            size: 9,
            color: rgb(0, 0, 0),
          });
          yPosition -= 20;
        } else {
          const keyMap: { [key: string]: string } = {
            idCriterio: 'ID',
            nombreCriterio: 'Nombre',
            descripcion: 'Descripción'
          };
          const displayedKey = keyMap[key] || key;
          
          page.drawText(`${displayedKey}:\t ${value}`, {
            x: 50,
            y: yPosition,
            size: 9,
            color: rgb(0, 0, 0),
          });
          yPosition -= 20;
        }
      });
      yPosition -= 20;
    });
  
    const pdfBytes = await pdfDoc.save();
  
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
  
    window.open(url, '_blank');
  }
  
  
  // async generarPDF() {
  //   const pdfDoc = await PDFDocument.create();
  //   const page = pdfDoc.addPage([400, 600]);

  //   page.drawText('Lista de Criterios:', {
  //     x: 50,
  //     y: 500,
  //     size: 24,
  //     color: rgb(0, 0, 0),
  //   });

  //   let yPosition = 450;
  //   this.criterio.forEach((dato: any) => {
  //     const keys = Object.keys(dato);
  //     page.drawLine({ start: { x: 50, y: yPosition-5 }, end: { x: 250, y: yPosition-5 }, color: rgb(0, 0, 0) });
  //     keys.forEach(key => {
  //       const value = dato[key];
  //       if (key === 'clasificacion' && typeof value === 'object') {
  //         //propiedades de clasificacion
  //         const clasificacionKeys = Object.keys(value);
  //         clasificacionKeys.forEach(clave => {
  //           const clasificacionValue = value[clave];
  //           page.drawText(`${key}.${clave}: ${clasificacionValue}`, {
  //             x: 50,
  //             y: yPosition,
  //             size: 12,
  //             color: rgb(0, 0, 0),
  //           });
  //           yPosition -= 20;
  //         });
  //       } else {
  //         page.drawText(`${key}: ${value}`, {
  //           x: 50,
  //           y: yPosition,
  //           size: 12,
  //           color: rgb(0, 0, 0),
  //         });
  //         yPosition -= 20;
  //       }
  //     });
  //   });

  //   const pdfBytes = await pdfDoc.save();

  //   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //   const url = URL.createObjectURL(blob);

  //   window.open(url, '_blank');
  // }


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
    page.drawText('Lista de Criterios:', {
      x: 250,
      y: 750,
      size: 15,
      color: rgb(0, 0, 0),
    });
  
    // Definir el tamaño y la posición de la tabla
    const startX = 50;
    let startY = 550;
    const cellPadding = 8;
  
    // Definir las propiedades de las celdas
    const fontSize = 9;
    const SizeColumn = [20, 100, 280, 100];
    const colorlineas = rgb(0.5, 0.5, 0.5);
    const colorencabezado = rgb(0, 0.1, 1);
  
    // Encabezados de la tabla
    const headers = ['ID', 'Nombre', 'Descripción', 'Clasificación'];
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
    for (let i = 0; i < this.criterio.length; i++) {
      const dato = this.criterio[i];
      const clasificacionNombre = dato.clasificacion ? dato.clasificacion.nombreClasificacion : '';
      const rowData = [
        dato.idCriterio.toString(),
        dato.nombreCriterio,
        dato.descripcion,
        clasificacionNombre
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
      if (j === 1 || j === 2  || j === 3) { // Si es la celda de descripción
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
      start: { x: startX, y: startY - (i - 8) * rowHeight},
      end: { x: startX + dataCellWidths.reduce((acc, width) => acc + width, 0), y: startY - (i - 8) * rowHeight},
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

