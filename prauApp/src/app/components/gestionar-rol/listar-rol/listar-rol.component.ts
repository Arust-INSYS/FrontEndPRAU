import { Component } from '@angular/core';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-listar-rol',
  templateUrl: './listar-rol.component.html',
  styleUrl: './listar-rol.component.css'
})
export class ListarRolComponent {
  roles: Rol[] = [];

  constructor(private rolService: RolService) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles(): void {
    this.rolService.getAllRoles().subscribe(
      (data: Rol[]) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error al obtener los roles', error);
      }
    );
  }


}
