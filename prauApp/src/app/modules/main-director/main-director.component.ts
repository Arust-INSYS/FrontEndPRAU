import { Component, OnInit } from '@angular/core';
import { Carrera } from '../../models/carrera';
import { CarreraService } from '../../services/carrera.service';
import { PeriodoAc } from '../../models/periodoAc';
import { PeriodoAcService } from '../../services/periodoAc.service';
import { DocenteService } from '../../services/docente.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-main-director',
  templateUrl: './main-director.component.html',
  styleUrls: ['./main-director.component.css'],
})

export class MainDirectorComponent {
  selectedYear: number = 0;
  yearRange: string = "";
  minDate: Date = new Date(2010, 0, 1);
  maxDate: Date = new Date();
  carreras: Carrera[] = [];
  periodosAcademicos: PeriodoAc[] = [];
  docentes: Usuario[] = [];

  constructor(
    private carreraService: CarreraService,
    private periodoAcService: PeriodoAcService,
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    this.cargarCarreras();
    this.cargarPeriodosAcademicos();
    this.cargarDocentes();
  }

  cargarCarreras(): void {
    this.carreraService.cargarCarreras().subscribe(
      (carreras: Carrera[]) => { // Especificamos el tipo de datos como Carrera[]
        this.carreras = carreras;
        console.log('Carreras cargadas:', this.carreras);
      },
      (error) => {
        console.error('Error al cargar carreras:', error);
      }
    );
  }

 
  cargarPeriodosAcademicos(): void {
    this.periodoAcService.cargarPeriodosAcademicos().subscribe(
      (periodos: PeriodoAc[]) => { 
        this.periodosAcademicos = periodos;
        console.log('Periodos académicos cargados:', this.periodosAcademicos);
      },
      (error: any) => {
        console.error('Error al cargar periodos académicos:', error);
      }
    );
  }

  cargarDocentes(): void {
    this.docenteService.cargarDocentes()
      .subscribe(
        docentes => {
          this.docentes = docentes;
          console.log('Docentes cargados:', this.docentes);
        },
        error => {
          console.error('Error al cargar docentes:', error);
        }
      );
  }

  onYearSelect(event: any) {
    console.log('Year selected:', event.year);
    // Aquí puedes realizar acciones con el año seleccionado
  }

}