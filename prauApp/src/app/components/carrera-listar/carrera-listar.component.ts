import { Component, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';
import { Carrera } from '../../models/carrera';
import { CarreraService } from '../../services/carrera.service';
import { PDFDocument, rgb } from 'pdf-lib';
import { ClasificacionUsuariosService } from '../../services/clasificacion-usuarios.service';
import { Usuario } from '../../models/usuario';
@Component({
  selector: 'app-carrera-listar',
  templateUrl: './carrera-listar.component.html',
  styleUrl: './carrera-listar.component.css'
})
export class CarreraListarComponent {

  @ViewChild('dt', { static: true }) table!: Table;
  searchTerm: string = '';
  carrera: Carrera[] = [];
  items: MenuItem[]|undefined;
$even: any;
$odd: any;
Delete: string|undefined;
products: any;
dt: any;
selectedProducts: any;
showModal() {
throw new Error('Method not implemented.');
}

  displayModal: boolean = false;

  customers: any
  selectedCustomers:any
  loading:any
  usuarios: Usuario[] = [];
  constructor(
    private carreraService: CarreraService, 
    private router: Router,
    private clasificacionUsuariosService: ClasificacionUsuariosService,
  
  ) {}

  ngOnInit(): void {
    this.obtenerCarrera();
  }
  applyGlobalFilter() {
    this.table.filter(this.searchTerm, 'nombreCarrera', 'contains'); // Aplicar el filtro global
  }
  obtenerCarrera() {
    this.carreraService.obtenerListaCarreras().subscribe(dato => {
      this.carrera = dato;
      console.log( this.carrera )
    });
  }
 

  actualizarCarrera(id: number) {

    this.router.navigate(['/menu/contenido-virtual/carrera-actualizar',id]);
}
  redirectToCarrera() {
    this.router.navigate(['/menu/contenido-virtual/carrera']);
  }
  eliminarCarrera(id: number) {
    // Mostrar cuadro de diálogo SweetAlert para confirmar la eliminación
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Desea eliminar la carrera?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma la eliminación, procede con la eliminación
        this.carreraService.eliminarcarrera(id).subscribe(() => {
          // Actualiza la lista de criterios después de la eliminación
          this.obtenerCarrera(); 
          // Muestra un cuadro de diálogo SweetAlert para informar al usuario que se eliminó correctamente
          Swal.fire(
            '¡Eliminado!',
            'La carrera ha sido eliminada.',
            'success'
          );
        }, error => {
          console.error('Error al eliminar el carrera:', error);
          // Muestra un cuadro de diálogo SweetAlert para informar al usuario sobre el error
          Swal.fire(
            'Error',
            'Error al eliminar: Esta vinculada con una asignatura .',
            'error'
          );
        });
      }
    });
  }

  obtenerUsuariosPorRol(roleId: number): void {
    this.clasificacionUsuariosService.obtenerUsuariosPorRol(roleId)
      .subscribe(user => {
        this.usuarios = user;
      });
      
  }
  async generarPDF() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 600]);
    const color = 'rgb(255, 0, 0)';

    page.drawText('Lista de Carreras:', {
      x: 50,
      y: 500,
      size: 20,
      color: rgb(0, 0, 0),
    });
  
    let yPosition = 450;
    this.carrera.forEach((dato: any) => {
      page.drawLine({ start: { x: 50, y: yPosition+20 }, end: { x: 250, y: yPosition+20 }, color: rgb(0, 0, 0) });
      const keys = Object.keys(dato);
      keys.forEach(key => {
        const value = dato[key];
        if (key === 'clasificacion' && typeof value === 'object') {
          //nombre de la clasificación
          const clasificacionNombre = value.nombreClasificacion || 'Sin clasificación';
          page.drawText(`Clasificación: \t${clasificacionNombre}`, {
            x: 50,
            y: yPosition,
            size: 10,
            color: rgb(0, 0, 0),
          });
          yPosition -= 20;
        } else {
          const keyMap: { [key: string]: string } = {
            idCarrera: 'ID',
            nombreCarrera: 'Nombre',
            descripcionCarrera: 'Descripción'
          };
          const displayedKey = keyMap[key] || key;
          
          page.drawText(`${displayedKey}:\t ${value}`, {
            x: 50,
            y: yPosition,
            size: 10,
            color: rgb(0, 0, 0),
          });
          yPosition -= 20;
        }
      });
      yPosition -= 20;
    });
  
    const pdfBytes = await pdfDoc.save();
  
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
  
    window.open(url, '_blank');
  }
  
}
