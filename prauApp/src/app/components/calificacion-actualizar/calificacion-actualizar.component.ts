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
    
    });
  }

 
  onSubmit() {
    // Verificar si los campos están llenos
    if (!this.id || !this.califcacion.descripcion) {
      this.toastr.error('Llene todos los campos antes de enviar.');
      return; // Detener el envío si los campos no están llenos
    }
  
    // Crear un objeto para actualizar solo la descripción
    const criterioActualizado = new Calificacion(this.id, this.califcacion.descripcion);

    this.calificacionService.actualizarcriterios(this.id, criterioActualizado).subscribe(
      dato => {
        // Mostrar la alerta de éxito
        this.toastr.success('Su cambio ha sido un éxito.');
        
        // Redirigir a la página de listado de calificaciones
        this.router.navigateByUrl('/menu/contenido-calificacion/calificacion-listar');
      },
      error => {
        // Manejar errores si ocurre alguno
        console.error('Error al actualizar el criterio:', error);
        // Mostrar una alerta de error en caso de que falle la actualización
        this.toastr.error('Error al actualizar el criterio. Por favor, intente nuevamente.');
      }
    );
}


}





