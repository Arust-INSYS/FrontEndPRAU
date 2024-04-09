
import { FormControl, FormGroup } from '@angular/forms';
// import { Component,OnInit  } from '@angular/core';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CriteriosService } from '../../services/criterios.service';
import { Router } from '@angular/router';
import { ClasificacionCriteriosService } from '../../services/clasificacion-criterios.service';
import { Criterios } from '../../models/criterios';
import { AsignaturaService } from '../../services/asignatura.service';
import { Asignatura } from '../../models/asignatura';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioPorRolDTO } from '../../models/UsuarioPorRolDTO';
import { Carrera } from '../../models/carrera';
import { CarreraService } from '../../services/carrera.service';
import { PeriodoAcService } from '../../services/periodo-ac.service';
import { PeriodoAc } from '../../models/periodoAc';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-analisis-uso',
  templateUrl: './analisis-uso.component.html',
  styleUrl: './analisis-uso.component.css'
})
export class AnalisisUsoComponent implements OnInit {


//variables para el chars o grafica
  data: any;
  options: any;
  ///
  opcines: string[] | undefined;
  selectedOpcines: string | undefined;

  //datos consumidos 
  listacriterios: Criterios[] = [];
  docentes: UsuarioPorRolDTO[] = [];
  carreras: Carrera[] = [];
  periodos: PeriodoAc[] = [];
  //saber cual opcion esta seleccionado para poder trabajr on el filtro
  selectedCarrera: any;
  filteredCarrera: any[] = [];
  selectedPerido: any;
  filteredPerido: any[] = [];
  selectedDocente: any;
  filteredDocentes: any[] = [];
  selectedOption: string = '';
  /////

  constructor(
    private criteriosService: CriteriosService,
    private router: Router,
   
    private carreraService: CarreraService,
    private usuarioService: UsuarioService,
    private periodoAcService: PeriodoAcService,

  ) { }


////////////////////////////// metodos de consumo////
  obtenereDocentes() {

    this.usuarioService.findUsuariosByRolId(4).subscribe((dato) => {
      this.docentes = dato;
      console.log(this.docentes);
    });
  }
  obtenerCarrera() {
    this.carreraService.obtenerListaCarreras().subscribe(dato => {
      this.carreras = dato;
      console.log(this.carreras);
    });
  }
  obtenerPerodosAc() {
    this.periodoAcService.getPeriodosAcs().subscribe((dato) => {
      this.periodos = dato;
      console.log(this.periodos)
    });
  }

  obtenerCriterios() {
    this.criteriosService.obtenerListacriterios().subscribe(dato => {
      this.listacriterios = dato;
      console.log(this.listacriterios)
        
       this.generarGrafica();
    
    },
    error => {
      console.error('Error al obtener los criterios: ', error);
    }
    );
  }
//////////////////////////////// fin metodos de consumo ///////////////////////
 
///saber que opcion esta selecionada 
  onOpcionSeleccionada(opcion: string) {
    this.selectedOption = opcion;
    this.selectedCarrera = null; // Limpiar la selección en el p-autoComplete
    this.filteredCarrera = []; // Limpiar las sugerencias filtradas
    this.filteredPerido = []; // Limpiar las sugerencias filtradas
    this.filteredDocentes = []; // Limpiar las sugerencias filtradas

    switch (opcion) {
      case 'Periodo Academico':
        this.obtenerPerodosAc();
        break;
      case 'Docente':
        this.obtenereDocentes();
        break;
      case 'Carrera':
        this.obtenerCarrera();
        break;
      default:
        console.log('Opción no reconocida');
        break;
    }
  }

////





  ngOnInit():void {
    this.obtenerCriterios();

    this.opcines = ['Periodo Academico', 'Docente', 'Carrera'];
  
   
 

  }


// metod generar grafica chart
  generarGrafica(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
  
    // nombres de los criterios para las etiquetas
    const nombreCriterios = this.listacriterios.map(c => c.nombreCriterio);
  
    // Genera valores aleatorios para los datos hasta consumiir del back esto es el porcentaje ya de cada criterio 
    const dataValues = Array.from({ length: nombreCriterios.length }, () => Math.floor(Math.random() * 100));
  
    const backgroundColors = Array.from({ length: nombreCriterios.length }, () => '#' + (Math.random().toString(16) + '000000').substring(2, 8)); // Genera colores aleatorios
  
    this.data = {
      labels: nombreCriterios,
      datasets: [
        {
          data: dataValues,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors.map(color => color + '100') // Agrega más colores aquí
        }
      ]
    };
  
    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }

  ///metodos para filtrar 
  filterCarrera(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.carreras.length; i++) {
      let carrera = this.carreras[i];
      if (carrera.nombreCarrera.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push("Code: "+carrera.idCarrera+" - Carrera : "+carrera.nombreCarrera);

      }
    }

    this.filteredCarrera = filtered;
  }

  filterPerido(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.periodos.length; i++) {
      let periodo = this.periodos[i];
      if (periodo.nombrePeriodo.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push("Code: "+periodo.idPeriodoAc+" - Periodo : "+periodo.nombrePeriodo);
      }
    }

    this.filteredPerido = filtered;
  }

  filterDocente(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.docentes.length; i++) {
      let docente = this.docentes[i];
      if (docente.perNombre1.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push("Code: "+docente.usuId+" - Docente : "+docente.perNombre1 + " " + docente.perApellido1);
        filtered.push();
      }
    }

    this.filteredDocentes = filtered;
  }

///// fin metodos para filtrar ///

///
onSelectAutoComplete(event: any) {
  // Obtener el objeto completo seleccionado
  const selectedObject = event;

  // Imprimir el objeto seleccionado en la consola
  console.log('Objeto seleccionado:', selectedObject);
}




//metodo descargar el grafico  en formato PDF
  descargar() {
    let data = document.getElementById('chart');
    html2canvas(data!).then(canvas => {
      // Few necessary setting options
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('grafico.pdf'); // Genera el PDF
    });
  }

}
