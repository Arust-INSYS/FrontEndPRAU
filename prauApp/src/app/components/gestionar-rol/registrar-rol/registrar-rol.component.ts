import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-registrar-rol',
  templateUrl: './registrar-rol.component.html',
  styleUrls: ['./registrar-rol.component.css']
})
export class RegistrarRolComponent implements OnInit {
  rol: Rol = new Rol();
  rolID: number = 0;
  valorSeleccionado: any;

  constructor(private rolService: RolService) {}

  ngOnInit(): void {}

  registrarRol(): void {
    this.rolService.createRol(this.rol).subscribe(() => {
      // Limpiar el formulario después de registrar el rol
      this.rol = new Rol();
    });
  }

  encontrarRol(id: number) {
    this.limpiarRegistro();
    this.rolService.searchRolId(id).subscribe(
      (res: any) => {
        // Verifica si res tiene un valor válido
        if (res) {
          console.log('Datos recibidos:', res);
          // Asigna los datos recibidos a las propiedades correspondientes
          this.rolID = res.rolId;
          this.rol.rolNombre = res.rolNombre;
          this.rol.rolDescripcion = res.rolDescripcion;
          this.valorSeleccionado = res.rolId;
        } else {
          console.error('La respuesta del servicio es nula o indefinida.');
        }
      },
      (error) => {
        console.error('Error al buscar el rol:', error);
      }
    );
  }

  limpiarRegistro() {
    this.rol = new Rol();
  }
}
