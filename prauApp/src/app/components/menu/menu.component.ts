import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  username!: string;
  userId!: bigint;

  constructor(private localStorage: LocalStorageService, private http:HttpClient){}

    ngOnInit(){
      this.username = this.localStorage.getItem('username')!;
      this.userId = this.localStorage.getItem('userId') as unknown as bigint;

      this.http.get<any>('http://localhost:8080/complexivo/rol/getById/')
  }
}