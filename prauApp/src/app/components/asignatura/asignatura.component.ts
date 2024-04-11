import { Component } from '@angular/core';
import { Asignatura } from '../../models/asignatura';
import { Carrera} from '../../models/carrera';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarreraService } from '../../services/carrera.service';
import { AsignaturaService } from '../../services/asignatura.service';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrl: './asignatura.component.css'
})
export class AsignaturaComponent {
  asignatura: Asignatura = new Asignatura();
  asignaturas: Asignatura[] = [];
  carrera: Carrera[] = [];
  constructor(
    private asignaturaService: AsignaturaService,
    private router: Router,
    private toastr: ToastrService,
    private CarreraService: CarreraService,
  ) {}
  ngOnInit(): void {
    this.obtenerasignaturas();
    this.obtenerCarreras();
  }

  obtenerasignaturas() {
    this.asignaturaService.obtenerListaAsignaturas().subscribe((dato) => {
      this.asignaturas = dato;
    });
  }
  obtenerCarreras() {
    this.CarreraService.obtenerListaCarreras().subscribe((dato) => {
        this.carrera = dato;
      });
  }
 

  guardarAsignatura() {
    if (
      !this.asignatura.nombreAsignatura ||
      !this.asignatura.descripcionAsignatura ||
      !this.selectedCountry.idCarrera
    ) {
      this.toastr.error('Por favor, complete todos los campos.', 'Error');
      return;
    }
    this.asignatura.carrera = this.selectedCountry
    const clasificacionSeleccionada = this.asignatura.carrera;
    this.asignaturaService.registrarasignaturas(this.asignatura).subscribe(
      () => {
        this.obtenerasignaturas();
        this.router.navigateByUrl('/menu/contenido-virtual/asignatura-listar');
        this.toastr.success('Asignatura guardada exitosamente.', 'Éxito');
        this.asignatura.nombreAsignatura = '';
        this.asignatura.descripcionAsignatura = '';
        this.asignatura.carrera = this.selectedCountry.idCarrera;
        
      },
      (error) => {
        if (error.error === 'La asignatura ya ha sido registrado previamente.') {
          this.toastr.error(error.error, 'Error');
        } else {
          this.toastr.error(
            'Error al guardar el asignatura. Por favor, inténtelo de nuevo más tarde.',
            'Error'
          );
        }
      }
    );
  }
/*
  guardarAsignatura() {
    if (
      !this.asignatura.nombreAsignatura ||
      !this.asignatura.descripcionAsignatura ||
      !this.selectedCountry.idCarrera
    ) {
      this.toastr.error('Por favor, complete todos los campos.', 'Error');
      return;
    }
    this.asignatura = this.selectedCountry
    const seleccion= this.asignatura.carrera;
    this.asignaturaService.registrarasignaturas(this.asignatura).subscribe(
      () => {
        this.obtenerasignaturas();
        this.router.navigateByUrl('/menu/contenido-virtual/carrera');
        this.toastr.success('Carrera guardada exitosamente.', 'Éxito');
        this.asignatura.nombreAsignatura = '';
        this.asignatura.descripcionAsignatura = '';
        this.asignatura.carrera = this.selectedCountry;
      },
      (error) => {
        if (error.error === 'La carrera ya ha sido registrado previamente.') {
          this.toastr.error(error.error, 'Error');
        } else {
          this.toastr.error(
            'Error al guardar la carrera. Por favor, inténtelo de nuevo más tarde.',
            'Error'
          );
        }
      }
    );
  }*/
  


  onSubmit() {
    this.guardarAsignatura();
  }

  ///////////////////////////////
 

  selectedCountry: any;

  filteredCountries: any[] = [];



  filterCountry(event: AutoCompleteCompleteEvent) {
    console.log(event.query);
    //console.table(this.usuarios)
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.carrera as any[]).length; i++) {
      let country = (this.carrera as any[])[i];
     
      if (country.nombreCarrera.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        console.log(country);
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
}
