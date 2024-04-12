import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarreraService } from '../../services/carrera.service';
import { PeriodoAcService } from '../../services/periodo-ac.service';
import { PersonaService } from '../../services/persona.service';
import { AulaService } from '../../services/aula.service';
import { PeriodoAc } from '../../models/periodoAc';
import { Carrera } from '../../models/carrera';
import { Aula } from '../../models/aula';
import { Persona } from '../../models/persona';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-grafica-director',
  templateUrl: './grafica-director.component.html',
  styleUrl: './grafica-director.component.css'
})
export class GraficaDirectorComponent {
  periodoSeleccionado: any;
  carreraSeleccionada: any;
  aulaSeleccionada: any;
  docentesSeleccionados: any[] = [];
  periodo: PeriodoAc = new  PeriodoAc();
  periodos:  PeriodoAc[] = [];
  carrera: Carrera = new  Carrera();
  carreras:  Carrera[] = [];
  aula: Aula = new  Aula();
  aulas:  Aula[] = [];
  persona: Usuario = new  Usuario();
  personas: Persona[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private periodoAcService: PeriodoAcService,
    private carreraService: CarreraService,
    private aulaService: AulaService,
    private personaService: PersonaService
  ) {}

  cargarDatosSeleccionados() {
    this.obtenerPeriodo();
    this.obtenerCarrera();
    this.obtenerAula();
    this.cargarDocentes();
    
  }
  
  obtenerPeriodo() {
    this.periodoAcService.obtenerListaPeriodoAc().subscribe((dato) => {
      this.periodoSeleccionado = dato[0]; // Supongamos que solo quieres mostrar el primer periodo seleccionado
    });
  }
  
  obtenerCarrera() {
    this.carreraService.obtenerListaCarreras().subscribe((dato) => {
      this.carreraSeleccionada = dato[0]; // Supongamos que solo quieres mostrar la primera carrera seleccionada
    });
  }
  
  obtenerAula() {
    this.aulaService.getAulas().subscribe((dato) => {
      this.aulaSeleccionada = dato[0]; // Supongamos que solo quieres mostrar la primera aula seleccionada
    });
  }
  
  cargarDocentes() {
    this.personaService.getPersonas().subscribe((dato) => {
      this.docentesSeleccionados = dato.slice(0, 3); // Supongamos que solo quieres mostrar los primeros 3 docentes seleccionados
    });
  }
  
}
