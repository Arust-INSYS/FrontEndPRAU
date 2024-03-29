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
  constructor( private criteriosService: CriteriosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.obtenercriterio();
      this.criteriosService.Buscarid(this.id).subscribe(
        response => {
          this.criterio = response

        });

    })

    this.obtenercriterio();

  }
  obtenercriterio() {
    this.criteriosService.obtenerListacriterios().subscribe(dato => {
      this.criterios = dato;
    });
  }

  onSubmit() {
   
    this.criteriosService.actualizarcriterios(this.id, this.criterio).subscribe(dato => {
      this.irAlaListaDecriterios();
    }, error => console.log(error));
  }


  irAlaListaDecriterios() {
    this.router.navigate(['/criterios-listar']);
  }

}

