import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-listar-rol',
  templateUrl: './listar-rol.component.html',
  styleUrls: ['./listar-rol.component.css']
})
export class ListarRolComponent implements OnInit {
  roles: Rol[] = [];
  selectedRol: Rol = { rolId: 0, rolNombre: '', rolDescripcion: '' };

  constructor(private router: Router, private rolService: RolService) {}

  ngOnInit(): void {
    this.getAllRoles();
  }

  selectRol(rol: Rol) {
    this.router.navigate(['/menu/contenido-persona/actualizar-rol', rol.rolId]);
  }

  getAllRoles(): void {
    this.rolService.getAllRoles().subscribe(
      (data: Rol[]) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error al obtener los roles', error);
        // Aquí podrías mostrar un mensaje de error en la interfaz de usuario
      }
    );
  }

  eliminarRol(id: number): void {
    if (confirm(`¿Estás seguro de eliminar el rol con ID ${id}?`)) {
      this.rolService.eliminarRol(id).subscribe(
        () => {
          // Eliminar el rol de la lista después de eliminarlo en el servidor
          this.roles = this.roles.filter((rol) => rol.rolId !== id);
        },
        (error) => {
          console.error('Error al eliminar el rol', error);
          // Aquí podrías mostrar un mensaje de error en la interfaz de usuario
        }
      );
    }
  }
}
