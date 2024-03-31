import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Criterios } from '../../models/criterios';
import { CriteriosService } from '../../services/criterios.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent {
  criterio:Criterios = new Criterios();
  criterios: Criterios[] = [];
  constructor(private criteriosService:CriteriosService,private router:Router) { }
  ngOnInit(): void {
    this.obtenercriterios();
   
  
  }
  obtenercriterios(){
    this.criteriosService.obtenerListacriterios().subscribe(dato => {
      this.criterios = dato;
    });
  }
  guardarCriterio() {
    console.log(this.criterio); // Verificar los valores de los campos
    var nombreCriterio = this.criterio.nombreCriterio;
    var descripcion = this.criterio.descripcion;
  
    this.criteriosService.registrarcriterios(this.criterio).subscribe(dato => {
      this.obtenercriterios();
      this.router.navigateByUrl('/criterios-listar'); // Llama a la función para ir a la lista después de guardar
    }, error => {
      // Manejo de errores
    });
  
    this.criterio.nombreCriterio = '';
    this.criterio.descripcion = '';
  }
  

  
  onSubmit() {

    this.guardarCriterio();
  }
}