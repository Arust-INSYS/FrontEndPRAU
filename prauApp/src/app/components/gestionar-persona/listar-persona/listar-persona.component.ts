import { Component } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { Router } from '@angular/router';
import { Persona } from '../../../models/persona';
import Swal from 'sweetalert2';
import { PDFDocument, rgb } from 'pdf-lib';

@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrl: './listar-persona.component.scss',
})
export class ListarPersonaComponent {
  value: any;
  personasList: Persona[] = [];
  displayModal: boolean = false;

  items = [
    {
      label: 'Update',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
    },
  ];
  constructor(private personaService: PersonaService) {
    this.listarPersona();
  }

  showModal() {
    this.displayModal = true;
    //this.router.navigate(['/persona', 'registrar']); // Navega a la ruta de MiModalComponent
  } /*
  async listarPersona() {
    await this.personaService.getAllPersonas().subscribe((res) => {
      console.log((this.personas = res));
    });
  }*/
  listarPersona() {
    this.personaService.getPersonas().subscribe((res) => {
      this.personasList = res;
    });
  }
  eliminarPersona(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.delete(id).subscribe(() => {
          Swal.fire('¡Eliminado!', 'La persona ha sido eliminada.', 'success');
          // Actualiza la lista de personas después de eliminar
          this.actualizarListaPersonas();
        });
      }
    });
  }
  actualizarListaPersonas() {
    window.location.reload();
  }
  //EDITAR
  personaEditar: Persona = new Persona();
  displayModalEdit: boolean = false;

  showModalEditar(persona: Persona) {
    // Abre el modal
    this.displayModalEdit = true;
    // Carga los datos de la persona en el formulario
    this.personaEditar = persona;
  }
  guardarCambios() {
    // Guarda los cambios en la base de datos
    this.personaService.update(72, this.personaEditar).subscribe((res) => {
      // Cierra el modal después de guardar los cambios
      this.displayModalEdit = false;
      console.log('UPDATE: ' + res);
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
    page.drawText('Lista de personas', {
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
    const SizeColumn = [20, 70, 70, 70, 100, 70, 70];
    const colorlineas = rgb(0.5, 0.5, 0.5);
    const colorencabezado = rgb(0, 0.1, 1);

    // Encabezados de la tabla
    const headers = ['ID', 'Nombres', 'Apellidos', 'Cédula', 'Dirección', 'F. Nacimiento', 'Teléfono'];
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
    for (let i = 0; i < this.personasList.length; i++) {
        const persona = this.personasList[i];
        const rowData = [
          persona.perId?.toString() || '', // Manejar valores null
          persona.perNombre1 || '',
          persona.perApellido1 || '',
          persona.perCedula || '',
          persona.perDireccion || '',
          persona.perFechaNacimiento ? persona.perFechaNacimiento.toString() : '',
          persona.perTelefono || ''
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