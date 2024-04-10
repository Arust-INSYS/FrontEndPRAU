import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  username!: string;
  userId!: bigint;
  datos: any;
  isAdmin: boolean = false;

  constructor(private localStorage: LocalStorageService, private http:HttpClient, private router: Router, private usurioService: UsuarioService){}

    ngOnInit(){
      this.username = this.localStorage.getItem('username')!;
      this.userId = BigInt(this.localStorage.getItem('userId') as unknown as bigint);
      
      const id: number = Number(this.userId);
      //Bloqueo de menu dependiendo el usuario
      if (id === 1) {
        this.isAdmin = true;
      }

      this.usurioService.buscarNombreUsuario(id).subscribe(data => {
        this.datos= data;
      });
  }
  
  logout() {
    sessionStorage.clear;
    sessionStorage.removeItem('token');
    this.localStorage.removeItem("token");
    this.router.navigate(['/login']).then(()=> window.location.reload());
  }
}