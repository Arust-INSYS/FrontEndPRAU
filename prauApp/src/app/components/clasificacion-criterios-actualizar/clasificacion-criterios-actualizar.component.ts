import { Component } from '@angular/core';
import { ClasificacionCriterios } from '../../models/clasificacion-criterios';
import { ClasificacionCriteriosService } from '../../services/clasificacion-criterios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clasificacion-criterios-actualizar',
  templateUrl: './clasificacion-criterios-actualizar.component.html',
  styleUrl: './clasificacion-criterios-actualizar.component.css'
})
export class ClasificacionCriteriosActualizarComponent {
  id!: number;
  criterio: ClasificacionCriterios = new ClasificacionCriterios();
  criterios: ClasificacionCriterios[] = [];
  constructor(
    private criteriosService: ClasificacionCriteriosService,
    private router: Router,
    private route: ActivatedRoute,private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.cargarCriterio(this.id); 
    });
  }
  cargarCriterio(id: number) {
    this.criteriosService.obtenerCriterioPorId(id).subscribe(
      response => {
        this.criterio = response;
      },
      error => {
        console.error('Error al cargar el criterio:', error);
      }
    );
  }
 
  onSubmit() {
    // Verificar si los campos están llenos
    if (!this.id || !this.criterio.nombreClasificacion || !this.criterio.descripcion) {
      this.toastr.error('Llene todos los campos antes de enviar.');
      return; // Detener el envío si los campos no están llenos
    }
  
    this.criteriosService.actualizarcriterios(this.id, this.criterio).subscribe(
      dato => {
        this.router.navigateByUrl('/menu/contenido-criterios/clasificacion-listar');
      },
      error => {
        console.error('Error al actualizar el criterio:', error);
        if (error.error && error.error === 'El nombre de la clasificacion ya está en uso') {
          this.toastr.error('El nombre de la clasificacion ya está en uso, por favor ingrese otro.');
        } else {
          this.toastr.error('Ese nombre ya esta en uso');
        }
      }
    );
  }
  
}



