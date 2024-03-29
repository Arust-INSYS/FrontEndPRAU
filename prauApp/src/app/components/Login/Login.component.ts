import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../services/local-storage.service';
import { LoginRequest } from '../../models/loginRequest';
import { jwtDecode } from "jwt-decode";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    //SERVICES
    private usuarioService: UsuarioService, private toastr: ToastrService, private localStorage: LocalStorageService,
  ) {
  }

  user: string = '';
  pass: string = '';

  ngOnInit(): void {
    this.localStorage.clear();
  }

  loginRequest: LoginRequest = new LoginRequest();

  decodeToken(token: string) {
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken) {
        const rol = decodedToken['rol'];
        this.localStorage.setItem('rol', rol[0].authority);

        const username = decodedToken['sub'];
        this.localStorage.setItem('username', username);

        const userId = decodedToken['id'];
        this.localStorage.setItem('userId', userId);

        const tiempoRestante = decodedToken['exp'] - Math.floor(Date.now() / 1000);
        this.localStorage.setItem('tiempoRestante', tiempoRestante.toString());

      } else {
        console.error("Token inválido o no contiene información de rol.");
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }


  logIn() {
    console.log('hola');
    this.usuarioService.usuarioValido(this.loginRequest.usuNombreUsuario?.trim() || '').subscribe(
      res => {
        if (res) {
          this.usuarioService.logIn(this.loginRequest).subscribe(
            response => {
              if (response) {
                this.localStorage.setItem('token', response.token);
                this.decodeToken(response.token);
                Swal.fire({
                  title: '¡LogIn exitoso!',
                  text: 'BIENVENIDO ' + this.loginRequest.usuNombreUsuario + '.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                  showCancelButton: false, // No mostrar el botón de cancelar
                }).then(() => {
                  // Redirige al usuario a la página de inicio de sesión.
                  this.router.navigate(['/']);


                });

              } else {
                alert('user not found')
              }
            }
          )
        } else {
          this.toastr.error('El usuario que ingreso no se encuentra registrado, digite correctamente', 'Nombre de usuario incorrecto', {
            timeOut: 4000
          });
        }
      }

    )

  }

}
