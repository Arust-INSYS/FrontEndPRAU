import { Component } from '@angular/core';
import { PeriodoAc } from '../../models/periodoAc';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PeriodoAcService } from '../../services/periodo-ac.service';
import { CarreraService } from '../../services/carrera.service';
import { Carrera } from '../../models/carrera';
import { AulaService } from '../../services/aula.service';
import { Aula } from '../../models/aula';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-principal-director',
  templateUrl: './principal-director.component.html',
  styleUrl: './principal-director.component.css'
})
export class PrincipalDirectorComponent {
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
  ngOnInit(): void {
    this.obtenerPeriodo();
    this.obtenerCarrera();
    this.obtenerAula();
    this.cargarDocentes();
  }

  obtenerPeriodo() {
    this.periodoAcService.obtenerListaPeriodoAc().subscribe((dato) => {
      this.periodos = dato;
    });
  }

  obtenerCarrera() {
    this.carreraService.obtenerListaCarreras().subscribe((dato) => {
      this.carreras = dato;
    });
  }
  obtenerAula() {
    this.aulaService.getAulas().subscribe((dato) => {
      this.aulas = dato;
    });
  }
  cargarDocentes() {
    this.personaService.getPersonas().subscribe((dato) => {
      this.personas = dato;
    });
  }
}

