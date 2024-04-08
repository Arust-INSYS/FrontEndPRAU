import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { Asignatura } from '../../models/asignatura';
import { AsignaturaService } from '../../services/asignatura.service';

@Component({
  selector: 'app-asignatura-listar',
  templateUrl: './asignatura-listar.component.html',
  styleUrls: ['./asignatura-listar.component.css']
})
export class AsignaturaListarComponent {

  @ViewChild('dt', { static: true }) table!: Table;
  searchTerm: string = '';
  asignaturas: Asignatura[] = [];
  items: MenuItem[] | undefined;

  constructor(private asignaturaService: AsignaturaService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerAsignaturas();
  }

  applyGlobalFilter() {
    this.table.filter(this.searchTerm, 'nombreAsignatura', 'contains'); // Aplicar el filtro global
  }

  obtenerAsignaturas() {
    this.asignaturaService.obtenerListaAsignaturas().subscribe(data => {
      this.asignaturas = data;
    });
  }

  actualizarAsignatura(id: number) {
    this.router.navigate(['/menu/contenido-virtual/asignatura-actualizar', id]);
  }

  redirectToAsignatura() {
    this.router.navigate(['/menu/contenido-virtual/asignatura']);
  }

  eliminarAsignatura(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Desea eliminar la asignatura?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignaturaService.eliminarAsignatura(id).subscribe(() => {
          this.obtenerAsignaturas(); 
          Swal.fire(
            '¡Eliminado!',
            'La asignatura ha sido eliminada.',
            'success'
          );
        }, error => {
          console.error('Error al eliminar la asignatura:', error);
          Swal.fire(
            'Error',
            'Hubo un error al intentar eliminar la asignatura.',
            'error'
          );
        });
      }
    });
  }
}
