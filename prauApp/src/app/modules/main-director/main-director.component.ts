import { Component } from '@angular/core';


@Component({
  selector: 'app-main-director',
  templateUrl: './main-director.component.html',
  styleUrl: './main-director.component.css',
})
export class MainDirectorComponent {
  selectedYear: number=0; // Variable para almacenar el año seleccionado
  yearRange: string=""; // Rango de años a mostrar
  minDate: Date=new Date(2010, 0, 1);; // Fecha mínima (1 de enero de 2010)
  maxDate: Date=new Date(); // Fecha máxima (31 de diciembre de 2020)

 

  onYearSelect(event: any) {
    console.log('Year selected:', event.year);
    // Aquí puedes realizar acciones con el año seleccionado
  }

}
