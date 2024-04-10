import { Component } from '@angular/core';
import { Carrera } from '../../models/carrera';
import { ActivatedRoute, Router } from '@angular/router';
import { CarreraService } from '../../services/carrera.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../models/usuario';
import { ClasificacionUsuariosService } from '../../services/clasificacion-usuarios.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-carrera-actualizar',
  templateUrl: './carrera-actualizar.component.html',
  styleUrl: './carrera-actualizar.component.css'
})


export class CarreraActualizarComponent {
  id!: number;
  carrera: Carrera = new Carrera();
  carreras: Carrera[] = [];
  usuarios: Usuario[] = [];
  
  constructor(
    private carreraService: CarreraService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private clasificacionUsuariosService: ClasificacionUsuariosService
  ) {}
  obtenerUsuarios() {
    this.clasificacionUsuariosService
      .obtenerListausuarios()
      .subscribe((dato) => {
        this.usuarios = dato;
      });
  }
  ngOnInit(): void {
    this.obtenerUsuarios();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.cargarCarrera(this.id);
    });
  }

  cargarCarrera(id: number) {
    this.carreraService.obtenerCarreraPorId(id).subscribe(
      (response) => {
        this.carrera = response;
      },
      (error) => {
        console.error('Error al cargar la carrera:', error);
      }
    );
  }

  onSubmit() {
     // Realizar la actualización de la carrera
     if (this.id && this.carrera.nombreCarrera && this.carrera.descripcionCarrera && this.selectedCountry) {
      // Asignar el director seleccionado a la carrera
      this.carrera.director = this.selectedCountry;
      // Llamar al servicio para actualizar la carrera
      this.carreraService.actualizarcarrera(this.id, this.carrera).subscribe(
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
    this.router.navigateByUrl('/menu/contenido-virtual/carrera-listar');
  }
  selectedCountry: any ;

  filteredCountries: any[] = [];



  filterCountry(event: AutoCompleteCompleteEvent) {
    console.log(event.query);
    //console.table(this.usuarios)
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.usuarios as any[]).length; i++) {
      let country = (this.usuarios as any[])[i];
     
      if (country.usuPerId?.perNombre1.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        console.log(country);
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
}
