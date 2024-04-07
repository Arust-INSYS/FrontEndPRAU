import { Component } from '@angular/core';
import { ClasificacionCriterios } from '../../models/clasificacion-criterios';
import { ClasificacionCriteriosService } from '../../services/clasificacion-criterios.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clasificacion-criterios',
  templateUrl: './clasificacion-criterios.component.html',
  styleUrl: './clasificacion-criterios.component.css'
})
export class ClasificacionCriteriosComponent {
  criterio:ClasificacionCriterios = new ClasificacionCriterios();
  criterios: ClasificacionCriterios[] = [];
  constructor(private clasificacionCriteriosService:ClasificacionCriteriosService,private router:Router,private toastr: ToastrService) { }
  ngOnInit(): void {
    this.obtenercriterios();
   
  
  }
  obtenercriterios(){
    this.clasificacionCriteriosService.obtenerListacriterios().subscribe(dato => {
      this.criterios = dato;
    });
  }
  guardarcriterio() {
    if (!this.criterio.nombreClasificacion || !this.criterio.descripcion) {
      this.toastr.error('Por favor, complete todos los campos.', 'Error');
      return;
    }
    
    console.log(this.criterio); // Verificar los valores de los campos
    var nombre_clasificacion = this.criterio.nombreClasificacion
    var descripcion = this.criterio.descripcion
 

    this.clasificacionCriteriosService.registrarcriterios(this.criterio).subscribe(dato => {
      this.obtenercriterios();
      this.irAlalistaDecriterios();
      this.toastr.success('La clasificación se registró con éxito.', 'Éxito');
    },
    error => {
      if (error.error === 'La clasifiación ya ha sido registrado previamente.') {
        this.toastr.error(error.error, 'Error');
      } else {
        this.toastr.error('Error al guardar la clasifiación. Por favor, inténtelo de nuevo más tarde.', 'Error');
      }
    }
  );

    this.criterio.nombreClasificacion = '';
    this.criterio.descripcion = '';


  }
  irAlalistaDecriterios(){
    this.router.navigate(['/menu/contenido-criterios/clasificacion-listar'])
  }
  onSubmit() {

    this.guardarcriterio();
  }
}
