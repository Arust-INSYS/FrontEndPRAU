import { Component, EventEmitter, Output } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { Router } from '@angular/router';
import { Persona } from '../../../models/persona';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { IExcelReportParams, IHeaderItem } from '../../../interface/IExcelReportParams';
import { ExcelService } from '../../../services/excel.service';
@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrl: './listar-persona.component.scss',

})

export class ListarPersonaComponent {
  value: any;
  // personasList: Persona[] = [];
  userList: Usuario[] = [];
  displayModal: boolean = false;
  usuario: Usuario = new Usuario();

  //estructura excel
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
  constructor(private personaService: PersonaService,
    private usuarioService: UsuarioService,
    private excelService: ExcelService) {
    this.listarPersona();
    this.compartirNombre()
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
    this.usuarioService.getAllUsuarios().subscribe((res) => {
      this.userList = res;
      this.loadExcelReportData(this.userList);
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
        //this.usuarioService.

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
  nombreGuardar: string = "";
  enviarNombre() {
    this.nombreGuardar = "EDITAR";
    return this.nombreGuardar;
  }
  recibirValor: string = '';

  @Output() nombreCompartido = new EventEmitter<string>();

  compartirNombre() {
    this.nombreCompartido.emit('Nombre a compartir');

  }


  ///cargar data en el excel
  //cambiar el tipo de dato de la lista
  loadExcelReportData(data: Usuario[]) {

    //NOMBRE DEL REPORTE
    const reportName = "Usuarios";

    //TAMAÑO DEL LOGO
    const logo = "G1:J1";

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: "№ REGISTRO" },
      // { header: "FOTO" },
      { header: "CÉDULA" },
      { header: "NOMBRES" },
      { header: "APELLIDOS" },
      { header: "FECHA DE NACIMIENTO" },
      { header: "TELÉFONO" },
      { header: "DIRECCIÓN" }
    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      idUser: item?.usuId,
      // foto: item.foto,
      ced: item.usuPerId?.perCedula,
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

  //metodo para el boton dew descarga
  downloadExcel(): void {
    if (this.excelReportData) {
      this.excelService.dowloadExcel(this.excelReportData);
    }
    this.listarPersona();
  }
}
