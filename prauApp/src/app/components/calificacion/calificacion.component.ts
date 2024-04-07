import { Component } from '@angular/core';
import { Calificacion } from '../../models/calificacion';
import { CalificacionService } from '../../services/calificacion.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrl: './calificacion.component.css'
})
export class CalificacionComponent {
  clasificacion:Calificacion = new Calificacion();
  clasificaciones: Calificacion[] = [];
  constructor(private clasificacionService:CalificacionService,private router:Router,private toastr: ToastrService) { }
  ngOnInit(): void {
    this.obtenercriterios();
   
  
  }
  obtenercriterios(){
    this.clasificacionService.obtenerListacriterios().subscribe(dato => {
      this.clasificaciones = dato;
    });
  }
  guardarcriterio() {
    if (!this.clasificacion.codCalificacion || !this.clasificacion.descripcion) {
      this.toastr.error('Por favor, complete todos los campos.', 'Error');
      return;
    }
    
    console.log(this.clasificacion); // Verificar los valores de los campos
    var nombre_clasificacion = this.clasificacion.codCalificacion;
    var descripcion = this.clasificacion.descripcion;
  
    this.clasificacionService.registrarcriterios(this.clasificacion).subscribe(
      dato => {
        this.obtenercriterios();
        this.irAlalistaDecriterios();
        this.toastr.success('La calificación se registró con éxito.', 'Éxito');
      },
      error => {
        if (error.error === 'La calificación ya ha sido registrada previamente.') {
          this.toastr.error(error.error, 'Error');
        } else {
          this.toastr.error('Error al guardar la calificación. Por favor, inténtelo de nuevo más tarde.', 'Error');
        }
      }
    );
  
    this.clasificacion.codCalificacion = '';
    this.clasificacion.descripcion = '';
  }
  
  irAlalistaDecriterios(){
    this.router.navigate(['/menu/contenido-criterios/listar-calificacion'])
  }
  onSubmit() {

    this.guardarcriterio();
  }
}