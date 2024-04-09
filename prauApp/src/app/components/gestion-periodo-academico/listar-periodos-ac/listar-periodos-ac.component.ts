import { Component, OnInit } from '@angular/core';
import { PeriodoAc } from '../../../models/periodoAc';
import { PeriodoAcService } from '../../../services/periodo-ac.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-periodos-ac',
  templateUrl: './listar-periodos-ac.component.html',
  styleUrl: './listar-periodos-ac.component.css',
})
export class ListarPeriodosAcComponent implements OnInit {
  periodos: PeriodoAc[] = [];
  origenalesperiodos: PeriodoAc[] = [];

  periodoId: number =0
  selectedPeriodoAc: PeriodoAc | null = null;
   // displayModalregsitro: boolean = false;
   // displayModalactualizar: boolean = false;


  constructor(
    private periodoAcService: PeriodoAcService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  // showModal() {
  //   this.displayModalregsitro = true;
  // }
 
  // showModalactualizar(id: number) {
  //   this.displayModalactualizar = true;
  //   this.periodoId = id;
  //   console.log('ID del registro a actualizar: ',this.periodoId);
  // }
  

  ngOnInit() {
    this.periodoAcService.getPeriodosAcs().subscribe((periodos) => {
      this.periodos = periodos;
      this.origenalesperiodos=periodos;
      // console.log(this.periodos)
    });
  }

  selectPeriodoAc(periodo: PeriodoAc) {
    //this.displayModalactualizar = true;
    console.log(periodo)
    this.router.navigate(['/menu/contenido-virtual/actualizar-periodo', periodo.idPeriodoAc]);
  }

  onSearch(event: any) {
    let filteredPeriodo = [];
  
    if(event.target.value) { // Si el campo de búsqueda no está vacío
      for(let periodo of this.periodos) {
        let periodoStr = JSON.stringify(periodo).toLowerCase();
        if(periodoStr.includes(event.target.value.toLowerCase())) {
          filteredPeriodo.push(periodo);
         
        }
      }
      this.periodos = filteredPeriodo; // Actualiza la lista de aulas con los resultados filtrados
    } else {
      this.periodos = [...this.origenalesperiodos]; // Si el campo de búsqueda está vacío, restablece la lista de aulas a su estado original
    }
  }

 

  eliminarPeriodoAcConfirmado(id: number) {
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
        this.periodoAcService.eliminarPeriodoAc(id).subscribe(() => {
          // Actualizar la lista de periodos después de la eliminación
         
          this.periodos = this.periodos.filter(periodo => periodo.idPeriodoAc !== id);
          Swal.fire(
            '¡Eliminado!',
            'El periodo académico ha sido eliminado correctamente.',
            'success'
          );
          
        }, error => {
          console.error('Error al eliminar el periodo académico:', error);
          Swal.fire(
            'Error',
            'Ha ocurrido un error al eliminar el periodo académico.',
            'error'
          );
        });
      }
      this.router.navigate(['/menu/contenido-virtual/listar-periodo']);
    });
  }


  



}
