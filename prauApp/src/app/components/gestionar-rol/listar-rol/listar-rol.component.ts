import { Component } from '@angular/core';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { AuthRolService } from '../../../services/authRolService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-rol',
  templateUrl: './listar-rol.component.html',
  styleUrls: ['./listar-rol.component.css']
})
export class ListarRolComponent {
  rolAuth: string = '';
  private subscription!: Subscription;
  rol: Rol = new Rol();

  roles: Rol[] = [];
  selectedRol: Rol = { rolId: 0, rolNombre: '', rolDescripcion: '' };
  displayDialog: boolean = false; // <-- Declaración de displayDialog
  displayModal: boolean = false;
  displayModalEdit: boolean = false;

  constructor(private rolService: RolService, private authRolService: AuthRolService) { }

  ngOnInit(): void {
    this.getAllRoles();
    this.subscription = this.authRolService.nombreRol$.subscribe((rol) => {
      this.rolAuth = rol;
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  showModalEditar(rol: Rol): void {
    this.selectedRol = { ...rol }; // Crear una copia del rol seleccionado
    this.displayModalEdit = true; // Mostrar el modal de edición
  }
  showModal() {
    this.displayModal = true;
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
  editarRol(rol: Rol): void {
    this.selectedRol = { ...rol }; // Crear una copia del rol seleccionado
    this.displayDialog = true; // Mostrar el modal de edición
  }
  
  guardarCambios(): void {
    this.rolService.actualizarRol(this.selectedRol.rolId, this.selectedRol).subscribe(
      (data: Rol) => {
        console.log('Rol actualizado:', data);
      this.getAllRoles();  this.displayDialog = false; // Cerrar el modal después de guardar los cambios
      this.getAllRoles();
    },
      (error) => {
        console.error('Error al actualizar el rol', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades
      }
    );
  }
  
eliminarRol(id: number): void {
  if (confirm(`¿Estás seguro de eliminar el rol con ID ${id}?`)) {
    this.rolService.eliminarRol(id).subscribe(
      () => {
        this.getAllRoles(); // Actualizar la lista después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el rol', error);
      }
    );
  }
}

}
