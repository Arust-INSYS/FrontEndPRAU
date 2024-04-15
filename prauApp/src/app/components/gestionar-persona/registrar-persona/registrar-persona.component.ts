import { Component, Input, ViewChild } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../models/persona';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../../../services/local-storage.service';
import { validarCedula } from '../../../common/validaciones';
import { Rol } from '../../../models/rol';
import { Usuario } from '../../../models/usuario';
import { RolService } from '../../../services/rol.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataMoodleService } from '../../../services/dataMoodle.service';
import { ListarPersonaComponent } from '../listar-persona/listar-persona.component';

@Component({
  selector: 'app-registrar-persona',
  templateUrl: './registrar-persona.component.html',
  styleUrl: './registrar-persona.component.css',
})
export class RegistrarPersonaComponent {
  @Input() nombre: string = '';
  @Input() IdEditar: number = 0;

  public date: Date = new Date();

  value: any;

  valorCedula: string = '';
  constructor(
    private personaService: PersonaService,
    private toastr: ToastrService,
    private sessionStorage: LocalStorageService,
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private router: Router,
    private dataMoodleService: DataMoodleService
  ) {
    this.listarRol();
    this.getData();
  }

  //OBJETOS
  //persona: Persona = new Persona();
  usuario: Usuario = new Usuario();
  selectRol: Rol = new Rol();
  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');
  saveUsername: any;
  //VARIABLES
  timeToastr: number = 4000;
  id: number = 0;
  //LISTAS
  listRoles: Rol[] = [];
  userId: number = 0;
  mode: string = '';

  //userPerID: number = 0;
  valorSeleccionado: any;
  encontrarUsuario(id: number) {
    this.limpiarRegistro();
    this.usuarioService.searchUsersId(id).subscribe((res) => {
      // Asigna los datos recibidos a userListado
      console.log('Datos recibidos:', res); // Muestra en la consola el objeto recibido
      //this.userPerID = res.usuPerId.perId;
      this.usuario.usuPerId.perId = res.usuPerId.perId;
      this.usuario.usuPerId.perCedula = res.usuPerId.perCedula;
      this.usuario.usuPerId.perNombre1 = res.usuPerId.perNombre1;
      this.usuario.usuPerId.perApellido1 = res.usuPerId.perApellido1;
      this.usuario.usuPerId.perDireccion = res.usuPerId.perDireccion;
      this.usuario.usuPerId.perTelefono = res.usuPerId.perTelefono;
      //this.usuario.rolId.rolNombre=res.rolId.rolNombre
      this.valorSeleccionado = res.rolId.rolId;
      //ELIMAR:
      this.eliminadoLogico();
      return this.usuario.usuPerId.perId;
    });
  }
  eliminadoLogico(){
    if (this.nombre == 'ELIMINAR') {
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
          this.usuario.usuEstado = 0;
      this.usuario.usuNombreUsuario = this.usuario.usuPerId.perCedula;
      this.personaService
        .update(this.usuario.usuPerId.perId, this.usuario.usuPerId)
        .subscribe(() => {
          this.recargarPagina(); 
          Swal.fire(
            'Eliminado!',
            'El usuario se ha eliminado',
            'success'
          );
          this.usuarioService
            .update(this.IdEditar, this.usuario)
            .subscribe(() => {});
        });
        this.listarPersonaComponent.listarPersona();
        }
      });
      
    }
  }
  
  guardarDatos(validaRol: boolean) {
    if (this.nombre == 'REGISTRAR') {
      if (
        this.usuario.usuPerId.perCedula &&
        this.usuario.usuPerId.perNombre1 &&
        this.usuario.usuPerId.perApellido1 &&
        this.usuario.usuPerId.perDireccion &&
        this.usuario.usuPerId.perFechaNacimiento &&
        this.usuario.usuPerId.perTelefono
      ) {
        if (validarCedula(this.usuario.usuPerId.perCedula)) {
          if (validaRol) {
            this.personaService
              .registrarPersona(this.usuario.usuPerId)
              .subscribe((response) => {
                this.usuario.usuEstado = 1;
                this.usuario.usuPerId = response;
                this.usuario.usuNombreUsuario = this.usuario.usuPerId.perCedula;

                // REGISTRAR USUARIO
                this.usuarioService
                  .registrarUsuario(this.usuario)
                  .subscribe((response) => {
                    Swal.fire({
                      title: '¡Registro Exitoso!',
                      text: `${this.usuario.usuPerId.perNombre1} ${this.usuario.usuPerId.perApellido1} (${this.usuario.rolId.rolNombre}) agregado correctamente`,
                      icon: 'success',
                      confirmButtonText: 'Confirmar',
                      showCancelButton: false, // No mostrar el botón de cancelar
                    }).then(() => {
                      this.recargarPagina();
                      this.limpiarRegistro();
                      //this.router.navigate(['/listausu']);
                    });
                  });
              });
          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'Por favor seleccione el rol para guardar el dato',
              icon: 'error',
              confirmButtonText: 'OK',
              showCancelButton: false,
            });
          }
        } else {
          Swal.fire({
            title: '¡Error!',
            text: 'Numero de cédula incorrecto',
            icon: 'error',
            confirmButtonText: 'OK',
            showCancelButton: false,
          });
        }
      } else {
        Swal.fire({
          title: '¡Error!',
          text: 'Campos Vacíos',
          icon: 'error',
          confirmButtonText: 'OK',
          showCancelButton: false,
          customClass: {
            popup: 'mensaje-guardado', // Clase CSS para el mensaje de Swal
          },
        });
      }
    }
    if (this.nombre == 'EDITAR') {
      this.usuario.usuEstado = 1;
      this.usuario.usuNombreUsuario = this.usuario.usuPerId.perCedula;
      this.personaService
        .update(this.usuario.usuPerId.perId, this.usuario.usuPerId)
        .subscribe(() => {
          Swal.fire(
            'Actualizado!',
            'La persona ha sido actualizado.',
            'success'
          );
          this.usuarioService
            .update(this.IdEditar, this.usuario)
            .subscribe(() => {});
        });
        this.listarPersonaComponent.listarPersona();
    }
    
  }

  userListar: any;
  roles: any[] = [];
  async listarRol() {
    await this.rolService.getAllRoles().subscribe((res: any[]) => {
      this.roles = res.map((role) => ({
        label: role.rolNombre,
        value: role.rolId,
      }));
    });
  }
  habilitar: boolean = false;
  onRolChange(selectedRoleId: number) {
    const selectedRole = this.roles.find(
      (role) => role.value === selectedRoleId
    );
    if (selectedRole) {
      this.usuario.rolId.rolNombre = selectedRole.label;
      this.usuario.rolId.rolId = selectedRole.value;
      console.log('Rol seleccionado:', this.usuario.rolId.rolId);
      this.habilitar = true;
    }
    return this.habilitar;
  }
  limpiarRegistro() {
    this.usuario = new Usuario();
    //this.persona = new Persona();
  }
  //FILTRAR DROPDOW CON BUSCAR
  selectedPersona: any;
  filtro: string = '';
  personas: any[] = [];
  personasFiltradas: any[] = [];
  getData() {
    this.dataMoodleService.getAllData().subscribe((data) => {
      this.personas = data.map((per) => ({
        ...per,
        nombreCompleto: `${per.perNombre1} ${per.perApellido1}|${per.perCedula}`,
      }));
      this.personasFiltradas = this.personas; // Inicialmente, las personas filtradas serán iguales a todas las personas
    });
  }

  filtrar() {
    this.personasFiltradas = this.personas.filter((per) =>
      per.nombreCompleto.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
  onPersonaSelect(event: any) {
    // Actualizar los datos de la persona seleccionada en el formulario
    this.usuario.usuPerId = event.value;
    console.log('Persona seleccionada:', this.usuario.usuPerId);
  }
  @ViewChild(ListarPersonaComponent)
  listarPersonaComponent!: ListarPersonaComponent;
  
  recargarPagina() {
    window.location.reload();
  }
}
