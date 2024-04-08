// TypeScript: asignatura-actualizar.component.ts
import { Component, OnInit } from '@angular/core';
import { CarreraService } from '../../services/carrera.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AsignaturaService } from '../../services/asignatura.service';
import { Asignatura } from '../../models/asignatura';
import { Carrera } from '../../models/carrera';

@Component({
  selector: 'app-asignatura-actualizar',
  templateUrl: './asignatura-actualizar.component.html',
  styleUrls: ['./asignatura-actualizar.component.css']
})
export class AsignaturaActualizarComponent implements OnInit {
  id!: number;
  asignatura: Asignatura = new Asignatura();
  carreras: Carrera[] = [];
  
  constructor(
    private asignaturaService: AsignaturaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private carreraService: CarreraService
  ) {}

  ngOnInit(): void {
    this.obtenerCarreras();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.cargarAsignatura(this.id);
    });
  }

  obtenerCarreras() {
    this.carreraService.obtenerListaCarreras().subscribe((datos) => {
      this.carreras = datos;
    });
  }

  cargarAsignatura(id: number) {
    this.asignaturaService.obtenerAsignaturaPorId(id).subscribe(
      (response) => {
        this.asignatura = response;
      },
      (error) => {
        console.error('Error al cargar la asignatura:', error);
      }
    );
  }

  onSubmit() {
    if (
      !this.asignatura.nombreAsignatura ||
      !this.asignatura.descripcionAsignatura ||
      !this.asignatura.carrera
    ) {
      this.toastr.error('Llene todos los campos antes de enviar.');
      return;
    }

    this.asignaturaService.actualizarasignatura(this.id, this.asignatura).subscribe(
      () => {
        this.toastr.success('Asignatura actualizada correctamente.');
        this.router.navigateByUrl('/menu/contenido-virtual/asignatura-listar');
      },
      (error) => {
        console.error('Error al actualizar la asignatura:', error);
        if (error.error && error.error === 'El nombre ya está en uso') {
          this.toastr.error('El nombre ya está en uso, por favor ingrese otro.');
        } else {
          this.toastr.error('Error al actualizar la asignatura. Por favor, inténtelo de nuevo más tarde.');
        }
      }
    );
  }
}
