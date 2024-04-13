import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { Router } from '@angular/router';
import { Persona } from '../../../models/persona';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import {
  IExcelReportParams,
  IHeaderItem,
} from '../../../interface/IExcelReportParams';
import { ExcelService } from '../../../services/excel.service';
import { PDFDocument, rgb } from 'pdf-lib';
import { Subscription } from 'rxjs';
import { AuthRolService } from '../../../services/authRolService.service';
import { RegistrarPersonaComponent } from '../registrar-persona/registrar-persona.component';
@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrl: './listar-persona.component.scss',
})
export class ListarPersonaComponent implements OnInit{

  rol: string = '';
  private subscription!: Subscription;

  value: any;
  // personasList: Persona[] = [];
  userList: Usuario[] = [];
  displayModal: boolean = false;
  usuario: Usuario = new Usuario();

  //estructura excel
  //PASO1
  excelReportData: IExcelReportParams | null = null;

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
  constructor(
    private personaService: PersonaService,
    private usuarioService: UsuarioService,
    private excelService: ExcelService,
    private  authRolService: AuthRolService,
  ) {
    this.listarPersona();
    
  }
  ngOnInit(): void {
    this.subscription = this.authRolService.nombreRol$.subscribe((rol) =>
    this.rol = rol);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
  nombreEditar:string="";
  idUsuario:number=0;
  showModal(guardarComo:string,id: number) {
    this.nombreEditar=guardarComo;
    
  

    if(this.nombreEditar=="EDITAR"){
      this.idUsuario=id;
      this.displayModal = true;
      this.enviarDatos(); 

    }if(this.nombreEditar=="REGISTRAR"){
      this.displayModal = true;

    }
    
    
  } 
  
  @ViewChild(RegistrarPersonaComponent)
  registrarPersonaComponent!: RegistrarPersonaComponent;
  enviarDatos() {
    // Envía los datos al componente RegistrarPersonaComponent
    this.registrarPersonaComponent.encontrarUsuario(this.idUsuario);
  }
  cerrar_Limpiar(){
    this.displayModal=false
    
  }
  
 
  /*
  async listarPersona() {
    await this.personaService.getAllPersonas().subscribe((res) => {
      console.log((this.personas = res));
    });
  }*/

  listarPersona() {
    this.usuarioService.getAllUsuarios().subscribe((res) => {
      this.userList = res;
      //PASO 5 colocar metodo de generar excel no el de descargar
      this.loadExcelReportData(this.userList);
    });
  }
  persona:Persona=new Persona()
  eliminarPersona(idUser: number,idPer:number) {
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
        this.usuario.usuEstado=0;
          this.usuario.usuNombreUsuario="";
          this.usuario.usuContrasena="";
          this.usuario.rolId.rolId=3;
        this.usuarioService.update(idUser,this.usuario).subscribe(() => {
          this.personaService.update(idPer,this.persona).subscribe(()=>{
          
          
            //this.usuario.usuId=idUser;
            Swal.fire('¡Eliminado!', 'La persona ha sido eliminada.', 'success');
            // Actualiza la lista de personas después de eliminar
            //this.actualizarListaPersonas();
            
           
            this.listarPersona();
          })
            
        });
        
        
      }
    });
  }
  actualizarListaPersonas() {
    window.location.reload();
  }


  //EXCEL
  ///cargar data en el excel
  //cambiar el tipo de dato de la lista
  //PASO2
  loadExcelReportData(data: Usuario[]) {
    //NOMBRE DEL REPORTE
    const reportName = 'Usuarios';

    //TAMAÑO DEL LOGO
    const logo = 'G1:J1';

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: '№ REGISTRO' },
      // { header: "FOTO" },
      { header: 'CÉDULA' },
      { header: 'NOMBRES' },
      { header: 'APELLIDOS' },
      { header: 'FECHA DE NACIMIENTO' },
      { header: 'TELÉFONO' },
      { header: 'DIRECCIÓN' },
    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      idUser: item?.usuId,
      // foto: item.foto,
      ced: item.usuPerId.perCedula,
      nom1: item.usuPerId?.perNombre1,
      ape1: item.usuPerId?.perApellido1,
      nacim: item.usuPerId?.perFechaNacimiento,
      telf: item.usuPerId?.perTelefono,
      dir: item.usuPerId?.perDireccion,
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
    this.listarPersona();
  }

  ////--------------------------
  //GENERAR DOCUMENTO PDF
  // Método para dividir la descripción en líneas más cortas
  splitDescriptionIntoLines(
    description: string,
    maxWidth: number,
    fontSize: number
  ): string[] {
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
    const imageBytes = await fetch('../../../assets/LOGO-RECTANGULAR.png').then(
      (res) => res.arrayBuffer()
    );
    const image = await pdfDoc.embedPng(imageBytes);
    page.drawImage(image, {
      x: 210, // Posición x de la imagen
      y: 780, // Posición y de la imagen
      width: 180, // Ancho de la imagen
      height: 40, // Alto de la imagen
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
    const headers = [
      'ID',
      'Nombres',
      'Apellidos',
      'Cédula',
      'Dirección',
      'F. Nacimiento',
      'Teléfono',
    ];
    const headersCellWidth = SizeColumn;
    const rowHeight = 20;
    const tableHeight = 200;

    // Dibujar encabezados y líneas horizontales
    for (let i = 0; i < headers.length; i++) {
      page.drawText(headers[i], {
        x:
          startX +
          headersCellWidth
            .slice(0, i)
            .reduce((acc, width) => acc + width + cellPadding, 2),
        y: startY + tableHeight - rowHeight - 20 + cellPadding,
        size: fontSize,
        color: colorencabezado,
      });
    }

    const dataCellWidths = SizeColumn; // Ancho de las celdas de datos
    // Llenar la tabla con los datos
    for (let i = 0; i < this.userList.length; i++) {
      const usuario = this.userList[i];
      const rowData = [
        usuario.usuPerId.perId?.toString() || '', // Manejar valores null
        usuario.usuPerId.perNombre1 || '',
        usuario.usuPerId.perApellido1 || '',
        usuario.usuPerId.perCedula || '',
        usuario.usuPerId.perDireccion || '',
        usuario.usuPerId.perFechaNacimiento
          ? usuario.usuPerId.perFechaNacimiento.toString()
          : '',
        usuario.usuPerId.perTelefono || '',
      ];

      // Calcular la altura máxima de la fila
      let maxHeight = 0;
      for (let j = 0; j < rowData.length; j++) {
        const lines =
          rowData[j].length / (dataCellWidths[j] / (fontSize * 0.55));
        const textHeight = lines * (fontSize * 0.3); // Ajustar según sea necesario
        maxHeight = Math.max(maxHeight, textHeight);
      }
      // Dibujar los datos de la fila y las líneas horizontales
      for (let j = 0; j < rowData.length; j++) {
        const cellX =
          startX +
          dataCellWidths
            .slice(0, j)
            .reduce((acc, width) => acc + width + cellPadding, 2);
        const cellY =
          startY +
          tableHeight -
          (i + 2.8) * rowHeight +
          cellPadding +
          maxHeight -
          fontSize * 0.85;
        const cellWidth = dataCellWidths[j] - 2 * cellPadding;

        // Dibujar texto
        if (j === 1 || j === 2 || j === 3) {
          // Si es la celda de descripción
          const descriptionLines = this.splitDescriptionIntoLines(
            rowData[j],
            cellWidth,
            fontSize
          );
          for (let k = 0; k < descriptionLines.length; k++) {
            page.drawText(descriptionLines[k], {
              x: cellX,
              y: cellY - k * (fontSize * 0.95),
              size: fontSize,
              color: rgb(0, 0, 0),
              maxWidth: cellWidth,
            });
          }
        } else {
          // Para otras celdas
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
          const nextCellX =
            startX +
            dataCellWidths
              .slice(0, j + 1)
              .reduce((acc, width) => acc + width + cellPadding, -8);
          const lineYStart = cellY + 30;
          const lineYEnd = cellY - maxHeight - 30;
          page.drawLine({
            start: { x: nextCellX, y: lineYStart },
            end: { x: nextCellX, y: lineYEnd },
            thickness: 1,
            color: colorlineas,
          });
        }
      }
      // Dibujar líneas horizontales entre las filas
      page.drawLine({
        start: { x: startX, y: startY - (i - 8) * rowHeight },
        end: {
          x:
            startX + 60 + dataCellWidths.reduce((acc, width) => acc + width, 0),
          y: startY - (i - 8) * rowHeight,
        },
        thickness: 1.5,
        color: colorlineas,
      });
      startY -= maxHeight + cellPadding;
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');
  }
}
