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
  
  constructor(
    private rolService: RolService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.rolId = this.activatedRoute.snapshot.params['id'];
    this.obtenerRol(this.rolId);
  }

  obtenerRol(id: number) {
    this.rolService.getRolById(id).subscribe(
      (rol: Rol) => {
        this.selectedRol = rol;
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
      this.rolService.actualizarRol(this.rolId, this.selectedRol).subscribe(
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
    this.selectedRol = new Rol();
    this.f.form.markAsPristine();
    this.f.form.markAsUntouched();
  }
}
