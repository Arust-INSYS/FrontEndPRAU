import { Component, OnInit } from '@angular/core';
import { Aula } from '../../../models/aula';
import { AulaService } from '../../../services/aula.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-listar-aulas',
  templateUrl: './listar-aulas.component.html',
  styleUrl: './listar-aulas.component.css'
})
export class ListarAulasComponent implements OnInit {

  aulas: Aula[]=[];
  constructor(private aulaService:AulaService, 
       private router: Router,) { }

  // displayModalregsitro: boolean = false;
  // displayModalactualizar: boolean = false;
  aulaId:number = 0;

  ngOnInit()  {

    this.aulaService.getAulas().subscribe((data)=>{
  console.log(data);
      this.aulas= data;
    
  });
  
}

// showModal() {
//   this.displayModalregsitro = true;
// }

// showModalactualizar(id: number) {
//   this.displayModalactualizar = true;
//   this.aulaId = id;
//   console.log('ID del registro a actualizar: ',this.aulaId);
// }

selectAula(aula: Aula) {
  //this.displayModalactualizar = true;
  console.log(aula)
  this.router.navigate(['/menu/contenido-virtual/actualizar-aula', aula.aulaId]);
}



eliminarAulaConfirmado(id: number) {
  Swal.fire({
    title: '¿Estás seguro de eliminar este periodo académico?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminarlo'
  }).then((result) => {
    if (result.isConfirmed) {
      this.aulaService.eliminarAula(id).subscribe(() => {
        // Actualizar la lista de periodos después de la eliminación
       
        this.aulas = this.aulas.filter(aula => aula.aulaId !== id);
        Swal.fire(
          '¡Eliminado!',
          'El Aula ha sido eliminado correctamente.',
          'success'
        );
        
        
      }, error => {
       // console.error('Error al eliminar Aula:', error);
        Swal.fire(
          'Error',
          'Ha ocurrido un error al eliminar Aula.',
          'error'
        );
      });
    }
    this.router.navigate(['/menu/contenido-virtual/listar-aulas']);
  });
}

}
