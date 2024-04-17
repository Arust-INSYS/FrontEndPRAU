import { Component } from '@angular/core';
import { PeriodoAc } from '../../models/periodoAc';
import { IAsignaturaXCarrera, IConsultarCarrera } from '../../interface/IConsultasBD';
import { PeriodoAcService } from '../../services/periodo-ac.service';
import { CarreraService } from '../../services/carrera.service';
import { AsignaturaService } from '../../services/asignatura.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { CriteriosService } from '../../services/criterios.service';
import { Criterios } from '../../models/criterios';

@Component({
  selector: 'app-generar-reportes',
  templateUrl: './generar-reportes.component.html',
  styleUrl: './generar-reportes.component.css'
})
export class GenerarReportesComponent {
  selectedPeriodo: any;
  selectedCarrera: any;
  selectedAsignatura: any;
  criterios:Criterios[]=[];
  periodosAc: PeriodoAc[] = [];
  carreras: IConsultarCarrera[] = [];
  asignaturas: IAsignaturaXCarrera[] = [];
  userId!: bigint;
  infoUser: any;
  ahora = new Date();
  fecha:string=""

  constructor(private periodoAcService: PeriodoAcService, private carreraService: CarreraService, private asignaturaService: AsignaturaService, private localStorage: LocalStorageService, private usurioService: UsuarioService, private criteServi:CriteriosService) {

  }

  ngOnInit(): void {
    let dia = this.ahora.getDate();
    let mes = this.ahora.getMonth() + 1; // Sumamos 1 porque los meses comienzan desde 0
    let año = this.ahora.getFullYear();
    this.fecha= dia+"/"+mes+"/"+año+""

    this.userId = BigInt(this.localStorage.getItem('userId') as unknown as bigint);
    const id: number = Number(this.userId);
    this.usurioService.buscarNombreUsuario(id).subscribe(data => {
      this.infoUser = data;

    });
    this.loadPeriodos();
    this.loadCarreras();
    this.loadAsignaturas();
    this.loadCriterios();
  }

  loadCarreras(): void {
    this.formatoFecha();
    this.carreraService.carreraXperiodo(this.selectedPeriodo?.idPeriodoAc ?? 0).subscribe(response => {
      this.carreras = response;
      if (this.selectedPeriodo?.idPeriodoAc === undefined) {
        console.error("No se pudo obtener idPeriodoAc porque selectedObj es nulo o indefinido.");
      } else {
        console.log("ID Periodo: " + this.selectedPeriodo.idPeriodoAc);
      }

    })
  }

  loadAsignaturas(): void {
    this.formatoFecha();
    this.asignaturaService.asignaturaXCarreara(this.selectedCarrera?.idCarrera ?? 0).subscribe(response => {
      this.asignaturas = response;
      console.log("ID Carrera: " + this.selectedCarrera?.idCarrera);
    })
  }

  loadPeriodos(): void {
    this.periodoAcService.getPeriodosAcs().subscribe(response => {
      this.periodosAc = response;
    })
  }

  reportGeneral() {
    if (this.selectedCarrera?.idCarrera !== undefined && this.selectedPeriodo?.idPeriodoAc !== undefined && this.selectedAsignatura?.idAsignatura !== undefined) {

    } else {
      return
    }


  }

  formatoFecha() {
    if (this.selectedPeriodo?.idPeriodoAc !== undefined) {
      this.selectedPeriodo.descripcion = this.selectedPeriodo.fechaInicio.toString().slice(0, 7) + "/" + this.selectedPeriodo.fechaFin.toString().slice(0, 7)
    }
  }

  loadCriterios(){
    this.criteServi.obtenerListacriterios().subscribe((datos)=>{
      
      this.criterios=datos;


    });

  }
}
