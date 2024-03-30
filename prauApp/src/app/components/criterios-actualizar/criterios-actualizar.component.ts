import { Component } from '@angular/core';
import { Criterios } from '../../models/criterios';
import { ActivatedRoute, Router } from '@angular/router';
import { CriteriosService } from '../../services/criterios.service';

@Component({
  selector: 'app-criterios-actualizar',
  templateUrl: './criterios-actualizar.component.html',
  styleUrl: './criterios-actualizar.component.css'
})
export class CriteriosActualizarComponent {
  id!: number;
  criterio: Criterios = new Criterios();
  criterios: Criterios[] = [];
  constructor(
    private criteriosService: CriteriosService,
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
        this.router.navigateByUrl('/criterios-listar');
      },
      error => {
        console.error('Error al actualizar el criterio:', error);
    
      }
    );
  }
}


