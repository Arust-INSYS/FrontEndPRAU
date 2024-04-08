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
      // console.log(this.periodos)
    });
  }

  selectPeriodoAc(periodo: PeriodoAc) {
    //this.displayModalactualizar = true;
    console.log(periodo)
    this.router.navigate(['/menu/contenido-virtual/actualizar-periodo', periodo.idPeriodoAc]);
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
