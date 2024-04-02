import { Component } from '@angular/core';
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

@Component({
  selector: 'app-registrar-persona',
  templateUrl: './registrar-persona.component.html',
  styleUrl: './registrar-persona.component.css',
})
export class RegistrarPersonaComponent {
  public date: Date = new Date();
  selectedUser: number = 3;
  value: any;
  userOptions = [
    { label: 'Responsable', value: 'Responsable' },
    { label: 'Director', value: 'Director' },
    { label: 'Docente', value: 'Docente' },
  ];
  userValues = [
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ];
  constructor(
    private personaService: PersonaService,
    private toastr: ToastrService,
    private sessionStorage: LocalStorageService,
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {} // Inyecta tu servicio en el constructor del componente
  /*
  registrarPersona(): void {
    this.personaService.registrarPersona(this.persona).subscribe(
      (response) => {
        console.log('Persona registrada correctamente:', response);
        // Aquí puedes manejar la respuesta como desees, por ejemplo, mostrar un mensaje de éxito o redirigir a otra página
      },
      (error) => {
        console.error('Error al registrar persona:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      }
    );
  }*/
  //OBJETOS
  persona: Persona = new Persona();
  usuario: Usuario = new Usuario();
  selectRol: Rol = new Rol();
  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

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
  guardarUser: any;
  registrar() {
    // REGISTRAR PERSONA
    this.personaService.registrarPersona(this.persona).subscribe((response) => {
      this.usuario.usuEstado = 1;
      this.usuario.usuPerId = response;

      // REGISTRAR USUARIO
      this.usuarioService
        .registrarUsuario(this.usuario)
        .subscribe((response) => {
          console.log('Ya llegueeee!!!');
          console.log(response);
        });
    });
  }
  userListar: any;
  async listarRol() {
    await this.rolService.getAllRoles().subscribe((res) => {
      console.log((this.userListar = res));
    });
  }
  limpiarRegistro() {
    this.usuario = new Usuario();
    this.persona = new Persona();
  }
}
