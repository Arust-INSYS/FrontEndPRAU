import { Component } from '@angular/core';
import { Criterios } from '../../models/criterios';
import { ActivatedRoute, Router } from '@angular/router';
import { CriteriosService } from '../../services/criterios.service';
import { ToastrService } from 'ngx-toastr';
import { ClasificacionCriteriosService } from '../../services/clasificacion-criterios.service';
import { ClasificacionCriterios } from '../../models/clasificacion-criterios';

@Component({
  selector: 'app-criterios-actualizar',
  templateUrl: './criterios-actualizar.component.html',
  styleUrl: './criterios-actualizar.component.css',
})
export class CriteriosActualizarComponent {
  id!: number;
  criterio: Criterios = new Criterios();
  criterios: Criterios[] = [];
  
  clasificaciones: ClasificacionCriterios[] = [];
  constructor(
    private criteriosService: CriteriosService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,private clasificacionCriteriosService: ClasificacionCriteriosService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.cargarCriterio(this.id);
    });
  }

  /*cargarCriterio(id: number) {
    this.criteriosService.obtenerCriterioPorId(id).subscribe(
      (response) => {
        this.criterio = response;
      },
      (error) => {
        console.error('Error al cargar el criterio:', error);
      }
    );
  }*/
  cargarCriterio(id: number) {
    this.criteriosService.obtenerCriterioPorId(id).subscribe(
      (criterioResponse) => {
        this.criterio = criterioResponse;
      },
      (criterioError) => {
        console.error('Error al cargar el criterio:', criterioError);
      }
    );
  
    this.clasificacionCriteriosService.obtenerListacriterios().subscribe(
      (clasificacionesResponse) => {
        this.clasificaciones = clasificacionesResponse;
      },
      (clasificacionesError) => {
        console.error('Error al cargar las clasificaciones:', clasificacionesError);
      }
    );
  }
  onSubmit() {
    // Verificar si los campos están llenos
    if (
      !this.id ||
      !this.criterio.nombreCriterio ||
      !this.criterio.descripcion   ||
      !this.criterio.clasificacion || 
      !this.criterio.clasificacion.nombreClasificacion
    
    ) {
      this.toastr.error('Llene todos los campos antes de enviar.');
      return; 
    }

    this.criteriosService.actualizarcriterios(this.id, this.criterio).subscribe(
      (dato) => {
        this.toastr.success('El criterio se actualizó exitosamente.');
        this.router.navigateByUrl('/menu/contenido-criterios/criterios-listar');
      },
      (error) => {
        console.error('Error al actualizar el criterio:', error);
        if (
          error.error &&
          error.error === 'El nombre del criterio ya está en uso'
        ) {
          this.toastr.error(
            'El nombre del criterio ya está en uso, por favor ingrese otro.'
          );
        } else {
          this.toastr.error(
            'Ese nombre ya esta en uso'
          );
        }
      }
    );
  }
}
