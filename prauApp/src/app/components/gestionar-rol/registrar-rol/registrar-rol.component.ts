import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-registrar-rol',
  templateUrl: './registrar-rol.component.html',
  styleUrl: './registrar-rol.component.css'
})
export class RegistrarRolComponent implements OnInit {
  rol: Rol = new Rol();

  constructor(private rolService: RolService) {}

  ngOnInit(): void {}

  registrarRol(): void {
      this.rolService.createRol(this.rol).subscribe(() => {
          // Limpiar el formulario después de registrar el rol
          this.rol = new Rol();
      });
  }
}