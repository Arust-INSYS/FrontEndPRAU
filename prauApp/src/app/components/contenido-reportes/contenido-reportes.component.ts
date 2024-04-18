import { Component, OnInit } from '@angular/core';
import { AuthRolService } from '../../services/authRolService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contenido-reportes',
  templateUrl: './contenido-reportes.component.html',
  styleUrl: './contenido-reportes.component.scss'
})
export class ContenidoReportesComponent implements OnInit{

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
