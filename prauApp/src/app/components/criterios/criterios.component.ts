import { Component } from '@angular/core';
import { AuthRolService } from '../../services/authRolService.service';
import { Subscription } from 'rxjs';

import { NgForm } from '@angular/forms';
import { Criterios } from '../../models/criterios';
import { CriteriosService } from '../../services/criterios.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClasificacionCriterios } from '../../models/clasificacion-criterios';
import { ClasificacionCriteriosService } from '../../services/clasificacion-criterios.service';
@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css'],
})
export class CriteriosComponent {
  rol: string = '';
  private subscription!: Subscription;
  criterio: Criterios = new Criterios();
  criterios: Criterios[] = [];
  clasificaciones: ClasificacionCriterios[] = [];
  // Inicializado con una cadena vacía

  estadoSeleccion: { label: string, value: string }[] = [
    { label: 'Opcional', value: 'Opcional' },
    { label: 'Obligatorio', value: 'Obligatorio' },
    { label: 'Al menos uno', value: 'Al menos uno' }
  ];
  
  constructor(
    private criteriosService: CriteriosService,
    private router: Router,
    private toastr: ToastrService,
    private clasificacionCriteriosService: ClasificacionCriteriosService,
    private  authRolService: AuthRolService
  ) {}
  ngOnInit(): void {
    this.obtenercriterios();
    this.obtenerClasificaciones();
    this.subscription = this.authRolService.nombreRol$.subscribe((rol) => {
      this.rol = rol;
  });


  }
  mostrarSelecccion(){
    console.log("SOY ESTADO:",this.criterio.estado);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  obtenercriterios() {
    this.criteriosService.obtenerListacriterios().subscribe((dato) => {
      this.criterios = dato;
    });
  }
 
  obtenerClasificaciones() {
    this.clasificacionCriteriosService
      .obtenerListacriterios()
      .subscribe((dato) => {
        this.clasificaciones = dato;
      });
  }

  guardarCriterio() {
    if (
      !this.criterio.nombreCriterio ||
      !this.criterio.descripcion ||
      
      !this.criterio.clasificacion?.idClasificacion
    ) {
      this.toastr.error('Por favor, complete todos los campos.', 'Error');
      return;
    }
 
    const clasificacionSeleccionada = this.criterio.clasificacion;
    this.criteriosService.registrarcriterios(this.criterio).subscribe(
      () => {
        this.obtenercriterios();
        this.router.navigateByUrl('/menu/contenido-criterios/criterios-listar');
        this.toastr.success('Criterio guardado exitosamente.', 'Éxito');
        this.criterio.nombreCriterio = '';
        this.criterio.descripcion = '';
        this.criterio.clasificacion = clasificacionSeleccionada;
        
        
        
      },
      (error) => {
        if (error.error === 'El criterio ya ha sido registrado previamente.') {
          this.toastr.error(error.error, 'Error');
        } else {
          this.toastr.error(
            'Error al guardar el criterio. Por favor, inténtelo de nuevo más tarde.',
            'Error'
          );
        }
      }
    );
  }

  onSubmit() {
    this.guardarCriterio();
  }
}
