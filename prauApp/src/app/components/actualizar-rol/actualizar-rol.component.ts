import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RolService } from '../../services/rol.service';
import { Rol } from '../../models/rol';

@Component({
  selector: 'app-actualizar-rol',
  templateUrl: './actualizar-rol.component.html',
  styleUrls: ['./actualizar-rol.component.css']
})
export class ActualizarRolComponent implements OnInit {
  selectedRol: Rol = new Rol();
  rolId: number = 0;
  f!: NgForm;
  roles: Rol = new Rol();

  rol: Rol = { rolId: 0, rolNombre: '', rolDescripcion: '' };

  constructor(
    private rolService: RolService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const rolId = this.route.snapshot.params['id'];
    this.rolService.getRolById(rolId).subscribe(
      (rol) => {
        rol.rolNombre = rol.rolNombre.toString();
        rol.rolDescripcion = rol.rolDescripcion.toString();
        this.selectedRol = rol; // Asignar el rol obtenido al rol seleccionado
      },
      (error) => {
        console.error('Error obteniendo el rol:', error);
        this.toastr.error('Error obteniendo el rol.');
      }
    );
  }

  actualizar(form: NgForm) {
    if (form.valid) {
      // Lógica de validación y actualización del rol
      this.rolService.actualizarRol(this.rolId, this.rol).subscribe(
        (response) => {
          this.router.navigate(['/menu/contenido-persona/listar-rol']);
          this.toastr.success('Rol actualizado correctamente');
          this.resetForm();
        },
        (error) => {
          console.error('Error al actualizar el rol:', error);
          this.toastr.error('Ocurrió un error al actualizar el rol.');
        }
      );
    } else {
      this.toastr.error('Por favor, complete todos los campos obligatorios.');
    }
  }

  resetForm() {
    this.rol = { rolId: 0, rolNombre: '', rolDescripcion: '' }; // Restablecer el objeto rol
    this.f.form.markAsPristine();
    this.f.form.markAsUntouched();
  }
}
