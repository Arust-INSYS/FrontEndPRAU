import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-actualizar-aula',
  templateUrl: './actualizar-aula.component.html',
  styleUrl: './actualizar-aula.component.css'
})
export class ActualizarAulaComponent {

  @Input() aulaId!: number;

}
