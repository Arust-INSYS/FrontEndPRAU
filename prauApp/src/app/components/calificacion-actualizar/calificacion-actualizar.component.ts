import { Component } from '@angular/core';
import { Calificacion } from '../../models/calificacion';
import { CalificacionService } from '../../services/calificacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calificacion-actualizar',
  templateUrl: './calificacion-actualizar.component.html',
  styleUrl: './calificacion-actualizar.component.css'
})
export class CalificacionActualizarComponent {
  id!: string;
  califcacion: Calificacion = new Calificacion();
  califcaciones: Calificacion [] = [];
  constructor(
    private calificacionService: CalificacionService,
    private router: Router,
    private route: ActivatedRoute,private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.cargarCriterio(this.id); 
    });
  }
  cargarCriterio(codCalificacion: string) {
    this.calificacionService.obtenerCriterioPorId(codCalificacion).subscribe(
      response => {
        this.califcacion = response;
      },
      error => {
        console.error('Error al cargar el criterio:', error);
      }
    );
  }
 
  onSubmit() {
  
    if (!this.id || !this.califcacion.descripcion) {
      this.toastr.error('Llene todos los campos antes de enviar.');
      return; 
    }
  
   
    const criterioActualizado = new Calificacion(this.id, this.califcacion.descripcion);

    this.calificacionService.actualizarcriterios(this.id, criterioActualizado).subscribe(
      dato => {
    
        this.toastr.success('Su cambio ha sido un éxito.');
        

        this.router.navigateByUrl('/menu/contenido-criterios/listar-calificacion');
      },
      error => {

        console.error('Error al actualizar el calificación:', error);
  
        this.toastr.error('Error al actualizar el calificación. Por favor, intente nuevamente.');
      }
    );
}


}





