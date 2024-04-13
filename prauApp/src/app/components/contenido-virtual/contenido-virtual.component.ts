import { Component, OnInit } from '@angular/core';
import { AuthRolService } from '../../services/authRolService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contenido-virtual',
  templateUrl: './contenido-virtual.component.html',
  styleUrl: './contenido-virtual.component.scss'
})

export class ContenidoVirtualComponent implements OnInit{
  rol: string = '';
  private subscription!: Subscription;

  constructor(private authRolService: AuthRolService){}

  ngOnInit(): void {
    this.subscription = this.authRolService.nombreRol$.subscribe((rol) => {
      this.rol = rol;
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
