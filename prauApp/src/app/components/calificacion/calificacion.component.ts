import { Component } from '@angular/core';
import { Calificacion } from '../../models/calificacion';
import { CalificacionService } from '../../services/calificacion.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthRolService } from '../../services/authRolService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrl: './calificacion.component.css'
})
export class CalificacionComponent {
  rol: string = '';
  private subscription!: Subscription;
  clasificacion:Calificacion = new Calificacion();
  clasificaciones: Calificacion[] = [];
  constructor(private clasificacionService:CalificacionService,private router:Router,private toastr: ToastrService, private authRolService: AuthRolService) { }
  ngOnInit(): void {
    this.obtenercriterios();
    this.subscription = this.authRolService.nombreRol$.subscribe((rol) => {
      this.rol = rol;
    });
  
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
  
  obtenercriterios(){
    this.clasificacionService.obtenerListacriterios().subscribe(dato => {
      this.clasificaciones = dato;
    });
  }
  guardarcriterio() {
    if (!this.clasificacion.codCalificacion || !this.clasificacion.descripcion) {
      this.toastr.error('Por favor, complete todos los campos.', 'Error');
      return;
    }
    
    console.log(this.clasificacion); // Verificar los valores de los campos
    var nombre_clasificacion = this.clasificacion.codCalificacion;
    var descripcion = this.clasificacion.descripcion;
  
    this.clasificacionService.registrarcriterios(this.clasificacion).subscribe(
      dato => {
        this.obtenercriterios();
        this.irAlalistaDecriterios();
        this.toastr.success('La calificación se registró con éxito.', 'Éxito');
      },
      error => {
        if (error.error === 'La calificación ya ha sido registrada previamente.') {
          this.toastr.error(error.error, 'Error');
        } else {
          this.toastr.error('Ya exite una calificación con el mismo nombre', 'Error');
        }
      }
    );
  
    this.clasificacion.codCalificacion = '';
    this.clasificacion.descripcion = '';
  }
  
  irAlalistaDecriterios(){
    this.router.navigate(['/menu/contenido-criterios/listar-calificacion'])
  }
  onSubmit() {

    this.guardarcriterio();
  }
}