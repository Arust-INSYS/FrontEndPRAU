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
  value: any;
  userOptions = [
    { label: 'Responsable', value: 'responsable' },
    { label: 'Director', value: 'director' },
    { label: 'Docente', value: 'docente' },
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
  listaJefes: Usuario[] = [];
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
  registrar() {
    if (this.validarRegistro()) {
      this.personaService
        .cedulaUnica(this.persona.perCedula?.trim() || '')
        .subscribe((response) => {
          if (response) {
            this.usuarioService
              .usuarioUnico(this.usuario.usuNombreUsuario?.trim() || '')
              .subscribe((res) => {
                if (res) {
                  const rolEncontrado = this.listRoles.find(
                    (rol) =>
                      rol.rolId.toString() ===
                      this.usuario.rolId?.rolId.toString()
                  );

                  if (rolEncontrado) {
                    this.usuario.rolId.rolNombre = rolEncontrado.rolNombre;

                    // REGISTRAR PERSONA
                    this.personaService
                      .registrarPersona(this.persona)
                      .subscribe((response) => {
                        this.usuario.usuEstado = 1;
                        this.usuario.usuPerId = response;

                        this.usuario.usuSaldoVacacional = 0;
                        // REGISTRAR USUARIO
                        this.usuarioService
                          .registrarUsuario(this.usuario)
                          .subscribe((response) => {
                            Swal.fire({
                              title: '¡Registro Exitoso!',
                              text: `${this.persona.perNombre1} ${this.persona.perApellido} (${this.usuario.rolId.rolNombre}) agregado correctamente`,
                              icon: 'success',
                              confirmButtonText: 'Confirmar',
                              showCancelButton: false, // No mostrar el botón de cancelar
                            }).then(() => {
                              this.limpiarRegistro();
                              this.router.navigate(['/listausu']);
                            });
                          });
                      });
                  }
                } else {
                  this.toastr.error(
                    'El nombre de usuario que ingresaste ya se encuentra registrado',
                    'Usuario duplicado',
                    {
                      timeOut: this.timeToastr,
                    }
                  );
                }
              });
          } else {
            this.toastr.error(
              'La cédula que ingresaste ya se encuentra registrada',
              'Cédula duplicada',
              {
                timeOut: this.timeToastr,
              }
            );
          }
        });
    }
  }
  limpiarRegistro() {
    this.usuario = new Usuario();
    this.persona = new Persona();
  }
}
