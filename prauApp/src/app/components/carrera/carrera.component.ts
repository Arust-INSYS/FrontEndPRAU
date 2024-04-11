import { Component } from '@angular/core';
import { Carrera } from '../../models/carrera';
import { Usuario } from '../../models/usuario';
import { ClasificacionUsuariosService } from '../../services/clasificacion-usuarios.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarreraService } from '../../services/carrera.service';
import { validarCadena, validarLetrasNum } from '../../common/validaciones';
import { UsuarioPorRolDTO } from '../../models/UsuarioPorRolDTO';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrl: './carrera.component.css'
})
export class CarreraComponent {
  carrera: Carrera = new Carrera();
  carreras: Carrera[] = [];
  usuarios: Usuario[] = [];
  userDto:UsuarioPorRolDTO[]=[];
  searchTerm: string = ''; // Término de búsqueda
  selectedUsuario: string = ''; // Usuario seleccionado
  usuarioss: any[] = []; // Lista de usuarios
  filteredUsuarios: any[] = [];



  constructor(
    private CarreraService: CarreraService,
    private router: Router,
    private toastr: ToastrService,
    private clasificacionUsuariosService: ClasificacionUsuariosService
  ) { }
  ngOnInit(): void {
    this.obtenercarreras();
    this.obtenerUsuarios();
    this.obtenerUsuariosPorRol(4);
  }
  obtenerUsuariosPorRol(roleId: number) {
    
    this.clasificacionUsuariosService.obtenerUsuariosPorRolDto(roleId)
      .subscribe((users) => {
        this.userDto = users;
  
      });
  }
  filterUsuarios() {
    this.filteredUsuarios = this.userDto.filter(usuario =>
      usuario.perNombre1?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      usuario.perApellido1?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Función para seleccionar un usuario
  seleccionarUsuario(usuario: any) {
    this.selectedUsuario = usuario;
  }
  obtenercarreras() {
    this.CarreraService.obtenerListaCarreras().subscribe((dato) => {
      this.carreras = dato;
      
    });
  }
  validarNombreCarrera(event: KeyboardEvent) {
    validarLetrasNum(event);
  }

  validarDescripcionCarrera(inputValue: string) {
    validarCadena(inputValue);
  }

  obtenerUsuarios() {
    this.clasificacionUsuariosService
      .obtenerListausuarios()
      .subscribe((dato) => {
        console.log(dato)
        this.usuarios = dato;
      });
  }

  guardarCarrera() {
    if (
      !this.carrera.nombreCarrera ||
      !this.carrera.descripcionCarrera ||
      !this.selectedCountry.usuId
    ) {
      this.toastr.error('Por favor, complete todos los campos.', 'Error');
      return;
    }
    this.carrera.director= this.selectedCountry
    const clasificacionSeleccionada = this.carrera.director;
    this.CarreraService.registrarcarreras(this.carrera).subscribe(
      () => {
        this.obtenercarreras();
        this.router.navigateByUrl('/menu/contenido-virtual/carrera');
        this.toastr.success('Carrera guardada exitosamente.', 'Éxito');
        this.carrera.nombreCarrera = '';
        this.carrera.descripcionCarrera = '';
        this.carrera.director = this.selectedCountry;
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
  }

  onSubmit() {
    this.guardarCarrera();
  }
  ///////////////////////////////
 

  selectedCountry: any;

  filteredCountries: any[] = [];



  filterCountry(event: AutoCompleteCompleteEvent) {
    //console.table(this.usuarios)
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.userDto as any[]).length; i++) {
      let country = (this.userDto as any[])[i];
     
      if (country.perNombre1?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        console.log(country);
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
}
