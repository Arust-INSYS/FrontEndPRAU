import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthRolService } from '../../services/authRolService.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  username!: string;
  userId!: bigint;
  datos: any;
  nombredeRol!: string;
  @Input() isAdmin = false;

  constructor(private localStorage: LocalStorageService, private http:HttpClient, private router: Router, private usurioService: UsuarioService, 
              private authRolService: AuthRolService){}

    ngOnInit(){
      this.username = this.localStorage.getItem('username')!;
      this.userId = BigInt(this.localStorage.getItem('userId') as unknown as bigint);
      
      const id: number = Number(this.userId);

      this.usurioService.buscarNombreUsuario(id).subscribe(data => {
        this.datos = data;
        this.nombreRol(this.datos[0][0]);
        this.authRolService.setNombreRol(this.datos[0][0]);
      });
      
  }
  
  logout() {
    sessionStorage.clear;
    sessionStorage.removeItem('token');
    this.localStorage.removeItem("token");
    this.router.navigate(['/login']).then(()=> window.location.reload());
  }

  nombreRol(dato: string){
    this.nombredeRol = dato;
    console.log(this.nombredeRol);
    this.authRolService.setNombreRol(this.nombredeRol);
  }

}