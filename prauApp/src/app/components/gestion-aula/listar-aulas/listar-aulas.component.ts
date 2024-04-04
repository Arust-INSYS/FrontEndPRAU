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



  ngOnInit()  {

    this.aulaService.getAulas().subscribe((data)=>{
  console.log(data);
      this.aulas= data;
    
  });
}

}
