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
  constructor(
    private criteriosService: ClasificacionCriteriosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.criteriosService.Buscarid(this.id).subscribe(
        response => {
          this.criterio = response;
        },
        error => {
          console.error('Error al buscar el criterio:', error);
     
        }
      );
    });
  }
  onSubmit() {
    this.criteriosService.actualizarcriterios(this.id, this.criterio).subscribe(
      dato => {
        this.router.navigateByUrl('/clasificacion-criterios-listar');
      },
      error => {
        console.error('Error al actualizar el criterio:', error);
    
      }
    );
  }
}




