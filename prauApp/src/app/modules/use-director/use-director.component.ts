import { Component } from '@angular/core';

@Component({
  selector: 'app-use-director',
  templateUrl: './use-director.component.html',
  styleUrl: './use-director.component.css'
})

export class UseDirectorComponent {
  componentCalendar:boolean=true;
  componentTaskComplete:boolean=false;
  componentTaskIncomplete:boolean=false;

  changeInterface(interfaceSelec: string){

    switch(interfaceSelec){
      case "calendar":
      
      this.componentCalendar=true;
      this.componentTaskComplete=false;
      this.componentTaskIncomplete=false;
      break;
      case "completed":
      
      this.componentCalendar=false;
      this.componentTaskComplete=true;
      this.componentTaskIncomplete=false;
      break;
      case "incomplet":
        this.componentCalendar=false;
        this.componentTaskComplete=false;
        this.componentTaskIncomplete=true;
        break;
    }


  }
}
