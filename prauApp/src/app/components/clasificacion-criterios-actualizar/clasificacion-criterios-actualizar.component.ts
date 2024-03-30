import { Component } from '@angular/core';
import { ClasificacionCriterios } from '../../models/clasificacion-criterios';
import { ClasificacionCriteriosService } from '../../services/clasificacion-criterios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clasificacion-criterios-actualizar',
  templateUrl: './clasificacion-criterios-actualizar.component.html',
  styleUrl: './clasificacion-criterios-actualizar.component.css'
})
export class ClasificacionCriteriosActualizarComponent {
  id!: number;
  criterio: ClasificacionCriterios = new ClasificacionCriterios();
  criterios: ClasificacionCriterios[] = [];
  constructor( private clasificacionCriteriosService: ClasificacionCriteriosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.obtenercriterio();
      this.clasificacionCriteriosService.Buscarid(this.id).subscribe(
        response => {
          this.criterio = response

        });

    })

    this.obtenercriterio();

  }
  obtenercriterio() {
    this.clasificacionCriteriosService.obtenerListacriterios().subscribe(dato => {
      this.criterios = dato;
    });
  }

  onSubmit() {
   
    this.clasificacionCriteriosService.actualizarcriterios(this.id, this.criterio).subscribe(dato => {
      this.irAlaListaDecriterios();
    }, error => console.log(error));
  }


  irAlaListaDecriterios() {
    this.router.navigate(['/clasificacion-criterios-listar']);
  }

}

