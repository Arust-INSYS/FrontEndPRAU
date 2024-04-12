
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
import { DataMoodleService } from '../../services/dataMoodle.service';
import { GraficosService } from '../../services/graficos.service';

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
graficas: any[] = [];
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
  private dataMoodleService: DataMoodleService,
  private graficosservice: GraficosService,
  private carreraService: CarreraService,
  private usuarioService: UsuarioService,
  private periodoAcService: PeriodoAcService,

) {

  this.getListargrafico()
}


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



getListargrafico() {
  this.graficosservice.getAllGrafica().subscribe((data) => {
    this.graficas = data; // Asigna los datos recibidos al arreglo de graficas
    console.log(this.graficas); // Muestra el listado en la consola

    // Llama al método para generar la gráfica después de obtener los datos
    this.generarGrafica();
  });
}

////////////////////////////// fin metodos de consumo ///////////////////////

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

///grafica

ngOnInit(): void {
  this.obtenerCriterios();

  this.opcines = ['Periodo Academico', 'Docente', 'Carrera'];  
}

// metod generacion de grafica chart
generarGrafica() {
    // Verifica que this.graficas esté correctamente inicializado y tenga los datos necesarios
    console.log(this.graficas);

    if (this.graficas && this.graficas.length > 0) {
      const labels = this.graficas.map(c => `${c.PeriodoAcademico} - ${c.totalCm}`); // Utiliza la propiedad correcta para el nombre del criterio
      const dataValues = this.graficas.map(c => `${c.totalC} `); // Utiliza la propiedad correcta para la cantidad (valor) del criterio

      const backgroundColors = Array.from({ length: labels.length }, () => '#' + (Math.random().toString(16) + '000000').substring(2, 8));

      this.data = {
        labels: labels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: backgroundColors,
            hoverBackgroundColor: backgroundColors.map(color => color + '100') // Agrega más colores aquí
          }
        ]
      };

      // Otras configuraciones para la gráfica, como opciones y estilos
      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,

            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      };
    }
  }


  ///////////////metodos  de filtrado //
  filterCarrera(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.carreras.length; i++) {
      let carrera = this.carreras[i];
      if (carrera.nombreCarrera.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push({ id: carrera.idCarrera, nombre: carrera.nombreCarrera } + carrera.nombreCarrera);
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
        filtered.push({ id: periodo.idPeriodoAc, nombre: periodo.nombrePeriodo });
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
        filtered.push({ id: docente.usuId, nombre: docente.perNombre1 + " " + docente.perApellido1 });
      }
    }

    this.filteredDocentes = filtered;
  }

  ///// fin metodos para filtrar ///

  ///obtener id selecciondo ya sea de  carrea,periodo o docente ////
  onSelectItem(event: any) {
    console.log("Objeto seleccionado:", event);
    //  event.id y event.nombre para obtener el ID y el nombre respectivamente
  }

  ///



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
