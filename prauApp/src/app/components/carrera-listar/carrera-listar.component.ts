import { Component, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';
import { Carrera } from '../../models/carrera';
import { CarreraService } from '../../services/carrera.service';
import { PDFDocument, rgb } from 'pdf-lib';
import { ClasificacionUsuariosService } from '../../services/clasificacion-usuarios.service';
import { Usuario } from '../../models/usuario';
@Component({
  selector: 'app-carrera-listar',
  templateUrl: './carrera-listar.component.html',
  styleUrl: './carrera-listar.component.css'
})
export class CarreraListarComponent {

  @ViewChild('dt', { static: true }) table!: Table;
  searchTerm: string = '';
  carrera: Carrera[] = [];
  items: MenuItem[]|undefined;
$even: any;
$odd: any;
Delete: string|undefined;
products: any;
dt: any;
selectedProducts: any;
showModal() {
throw new Error('Method not implemented.');
}

  displayModal: boolean = false;

  customers: any
  selectedCustomers:any
  loading:any
  usuarios: Usuario[] = [];

  titulo: string = 'Carreras Registradas';
  encabezado: [string, string, string, string] = ['ID', 'Carrera', 'Descripcion', 'Director'];
  cellSize: [number, number, number, number] = [20, 100, 250, 100,];

  constructor(
    private carreraService: CarreraService, 
    private router: Router,
    private clasificacionUsuariosService: ClasificacionUsuariosService,
  
  ) {}

  ngOnInit(): void {
    this.obtenerCarrera();
  }
  applyGlobalFilter() {
    this.table.filter(this.searchTerm, 'nombreCarrera', 'contains'); // Aplicar el filtro global
  }
  obtenerCarrera() {
    this.carreraService.obtenerListaCarreras().subscribe(dato => {
      this.carrera = dato;
      console.log( this.carrera )
    });
  }

  actualizarCarrera(id: number) {

    this.router.navigate(['/menu/contenido-virtual/carrera-actualizar',id]);
}
  redirectToCarrera() {
    this.router.navigate(['/menu/contenido-virtual/carrera']);
  }
  eliminarCarrera(id: number) {
    // Mostrar cuadro de diálogo SweetAlert para confirmar la eliminación
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Desea eliminar la carrera?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma la eliminación, procede con la eliminación
        this.carreraService.eliminarcarrera(id).subscribe(() => {
          // Actualiza la lista de criterios después de la eliminación
          this.obtenerCarrera(); 
          // Muestra un cuadro de diálogo SweetAlert para informar al usuario que se eliminó correctamente
          Swal.fire(
            '¡Eliminado!',
            'La carrera ha sido eliminada.',
            'success'
          );
        }, error => {
          console.error('Error al eliminar el carrera:', error);
          // Muestra un cuadro de diálogo SweetAlert para informar al usuario sobre el error
          Swal.fire(
            'Error',
            'Error al eliminar: Esta vinculada con una asignatura .',
            'error'
          );
        });
      }
    });
  }

  obtenerUsuariosPorRol(roleId: number): void {
    this.clasificacionUsuariosService.obtenerUsuariosPorRol(roleId)
      .subscribe(usuarios => {
        this.usuarios = usuarios;
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
    page.drawText('Lista de carreras', {
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
    const SizeColumn = [20, 100, 250, 100,];
    const colorlineas = rgb(0.5, 0.5, 0.5);
    const colorencabezado = rgb(0, 0.1, 1);

    // Encabezados de la tabla
    const headers = ['ID', 'Carrera', 'Descripcion', 'Director'];
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
    for (let i = 0; i < this.carrera.length; i++) {
        const dato = this.carrera[i];
        const rowData = [
          dato.idCarrera?.toString() || '', // Manejar valores null
          dato.nombreCarrera || '',
          dato.descripcionCarrera || '',
          dato.director?.usuPerId?.perNombre1 || '' + dato.director?.usuPerId.perApellido1 || '',
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