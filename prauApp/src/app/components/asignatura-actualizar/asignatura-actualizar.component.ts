// TypeScript: asignatura-actualizar.component.ts
import { Component, OnInit } from '@angular/core';
import { CarreraService } from '../../services/carrera.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AsignaturaService } from '../../services/asignatura.service';
import { Asignatura } from '../../models/asignatura';
import { Carrera } from '../../models/carrera';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-asignatura-actualizar',
  templateUrl: './asignatura-actualizar.component.html',
  styleUrls: ['./asignatura-actualizar.component.css']
})
export class AsignaturaActualizarComponent implements OnInit {
  id!: number;
  asignatura: Asignatura = new Asignatura();
  carreras: Carrera[] = [];
  asignaturas: Asignatura[] = [];

  constructor(
    private asignaturaService: AsignaturaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private carreraService: CarreraService
  ) {}

  ngOnInit(): void {
    this.obtenerCarreras();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.cargarAsignatura(this.id);
    });
  }

  obtenerCarreras() {
    this.carreraService.obtenerListaCarreras().subscribe((datos) => {
      this.carreras = datos;
      console.log(datos)
    });
  }

  cargarAsignatura(id: number) {
    this.asignaturaService.obtenerAsignaturaPorId(id).subscribe(
      (response) => {
        this.asignatura = response;
        this.selectedCountry = response.carrera?.nombreCarrera;
      },
      (error) => {
        console.error('Error al cargar la asignatura:', error);
      }
    );
  }

  onSubmit() {
    // Realizar la actualización de la carrera
    if (this.id && this.asignatura.nombreAsignatura && this.asignatura.descripcionAsignatura && this.selectedCountry) {
     // Asignar el director seleccionado a la carrera
     this.asignatura.carrera = this.selectedCountry;
     // Llamar al servicio para actualizar la carrera
     this.asignaturaService.actualizarasignatura(this.id, this.asignatura).subscribe(
       () => {
         this.toastr.success('La carrera se actualizó correctamente.', 'Éxito');
         this.guardar(); // Llamar al método guardar después de la edición
       },
       error => {
         console.error('Error al actualizar la carrera:', error);
         if (error.error && error.error === 'El nombre ya está en uso') {
           this.toastr.error('El nombre ya está en uso, por favor ingrese otro.', 'Error');
         } else {
           this.toastr.error('Hubo un error al actualizar la carrera.', 'Error');
         }
       }
     );
   } else {
     this.toastr.error('Por favor, complete todos los campos antes de enviar.', 'Error');
   }
 }
 guardar() {
   // Implementa aquí la lógica para guardar después de la edición
   // Por ejemplo, puedes redirigir al usuario a la lista de carreras después de la edición
   this.router.navigateByUrl('/menu/contenido-virtual/asignatura-listar');
 }

  ///////////////////////////////
 

  selectedCountry: any ;

  filteredCountries: any[] = [];



  filterCountry(event: AutoCompleteCompleteEvent) {
    
    console.log(event.query);
    console.table(this.asignaturas)
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.carreras as any[]).length; i++) {
      let country = (this.carreras as any[])[i];
     
      if (country.nombreCarrera.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        console.log(country);
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
}
