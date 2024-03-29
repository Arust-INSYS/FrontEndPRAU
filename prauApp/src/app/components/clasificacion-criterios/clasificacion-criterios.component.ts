import { Component } from '@angular/core';
import { ClasificacionCriterios } from '../../models/clasificacion-criterios';
import { ClasificacionCriteriosService } from '../../services/clasificacion-criterios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clasificacion-criterios',
  templateUrl: './clasificacion-criterios.component.html',
  styleUrl: './clasificacion-criterios.component.css'
})
export class ClasificacionCriteriosComponent {
  criterio:ClasificacionCriterios = new ClasificacionCriterios();
  criterios: ClasificacionCriterios[] = [];
  constructor(private clasificacionCriteriosService:ClasificacionCriteriosService,private router:Router) { }
  ngOnInit(): void {
    this.obtenercriterios();
   
  
  }
  obtenercriterios(){
    this.clasificacionCriteriosService.obtenerListacriterios().subscribe(dato => {
      this.criterios = dato;
    });
  }
  guardarcriterio() {
    
    console.log(this.criterio); // Verificar los valores de los campos
    var nombre_clasificacion = this.criterio.nombre_clasificacion;
 

    this.clasificacionCriteriosService.registrarcriterios(this.criterio).subscribe(dato => {
      this.obtenercriterios();
      this.irAlalistaDecriterios();
    }, error => {
  
    },

    );

    this.criterio.nombre_clasificacion = '';


  }
  irAlalistaDecriterios(){
    this.router.navigate(['/criterios-listar'])
  }
  onSubmit() {

    this.guardarcriterio();
  }
}
