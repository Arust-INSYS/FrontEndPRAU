import { Component, OnInit } from '@angular/core';
import { Aula } from '../../../models/aula';
import { AulaService } from '../../../services/aula.service';



@Component({
  selector: 'app-listar-aulas',
  templateUrl: './listar-aulas.component.html',
  styleUrl: './listar-aulas.component.css'
})
export class ListarAulasComponent implements OnInit {

  aulas: Aula[]=[];
  constructor(private aulaService:AulaService) { }

  displayModalregsitro: boolean = false;
  displayModalactualizar: boolean = false;
  aulaId:number = 0;

  ngOnInit()  {

    this.aulaService.getAulas().subscribe((data)=>{
  console.log(data);
      this.aulas= data;
    
  });
  
}

showModal() {
  this.displayModalregsitro = true;
}

showModalactualizar(id: number) {
  this.displayModalactualizar = true;
  this.aulaId = id;
  console.log('ID del registro a actualizar: ',this.aulaId);
}

}
