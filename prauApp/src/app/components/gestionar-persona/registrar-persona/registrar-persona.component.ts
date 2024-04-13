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
  @Input() nombre: string="";
  
  public date: Date = new Date();
  selectedUser: number = 3;
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
    
    
    ;
  } 
  mostrarNombre() {
    console.log('El nombre es:', this.nombre);
  }
  
  //OBJETOS
  persona: Persona = new Persona();
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
  validarRegistro(): boolean {
    //CEDULA
    if (!this.persona.perCedula) {
      this.toastr.error(
        'Cedula es un campo obligatorio',
        'Ingrese un numero de identificación',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    } else {
      if (!validarCedula(this.persona.perCedula)) {
        this.toastr.error(
          'Digite correctamente su numero de identificación',
          'Cedula invalido',
          {
            timeOut: this.timeToastr,
          }
        );
        return false;
      }
    }
    return false;
  }
  designarRol(): boolean {
    const rolEncontrado = this.listRoles.find(
      (rol) => rol.rolId.toString() === this.usuario.rolId?.rolId.toString()
    );

    if (rolEncontrado) {
      this.usuario.rolId = rolEncontrado;
      // console.log(this.usuario.rolId)
      return true;
    } else {
      // Manejar el caso en el que no se encontró un rol
      console.log('No se encontró un rol con el ID correspondiente.');
      return false;
    }
  }
  registrar(validaRol: boolean) {
    if(this.nombre=="REGISTRAR"){
      // REGISTRAR PERSONA
    if (
      this.persona.perCedula &&
      this.persona.perNombre1 &&
      this.persona.perApellido1 &&
      this.persona.perDireccion &&
      this.persona.perFechaNacimiento &&
      this.persona.perTelefono
    ) {
      if (validaRol) {
        this.personaService
          .registrarPersona(this.persona)
          .subscribe((response) => {
            this.usuario.usuEstado = 1;
            this.usuario.usuPerId = response;
            this.usuario.usuNombreUsuario = this.persona.perCedula;

            // REGISTRAR USUARIO
            this.usuarioService
              .registrarUsuario(this.usuario)
              .subscribe((response) => {
                Swal.fire({
                  title: '¡Registro Exitoso!',
                  text: `${this.persona.perNombre1} ${this.persona.perApellido1} (${this.usuario.rolId.rolNombre}) agregado correctamente`,
                  icon: 'success',
                  confirmButtonText: 'Confirmar',
                  showCancelButton: false,// No mostrar el botón de cancelar
                  
                
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
        text: 'Campos Vacíos',
        icon: 'error',
        confirmButtonText: 'OK',
        showCancelButton: false,
        customClass: {
          popup: 'mensaje-guardado' // Clase CSS para el mensaje de Swal
        }
      });
    }

    }else{
console.log("ESTAMOS TRABAJANDO EN EDITAR")
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
    this.persona = new Persona();
  }
  //FILTRAR DROPDOW CON BUSCAR
  selectedPersona: any;
  filtro: string = '';
  personas: any[] = [];
  personasFiltradas: any[] = [];
  getData() {
    this.dataMoodleService.getAllData().subscribe((data) => {
      this.personas = data.map((persona) => ({
        ...persona,
        nombreCompleto: `${persona.perNombre1} ${persona.perApellido1}|${persona.perCedula}`,
      }));
      this.personasFiltradas = this.personas; // Inicialmente, las personas filtradas serán iguales a todas las personas
    });
  }

  filtrar() {
    this.personasFiltradas = this.personas.filter((persona) =>
      persona.nombreCompleto.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
  onPersonaSelect(event: any) {
    // Actualizar los datos de la persona seleccionada en el formulario
    this.persona = event.value;
    console.log('Persona seleccionada:', this.persona);
  }
  recargarPagina() {
    window.location.reload();
  }
 
}
