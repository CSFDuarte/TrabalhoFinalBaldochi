import { Component, OnInit } from '@angular/core';
import {Globals} from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Book Store';
  private menuapp: string;
  site: string;
  menusite: string;


  ngOnInit(){
   this.site = 'home';
  }
  constructor(private globals: Globals){
    this.menuapp = globals.menu;
  }

  private changeMenu(){
    if(this.globals.menu == 'home' && this.menuapp == 'home'){this.globals.menu = 'site'}
    else if (this.globals.menu == 'site' && this.menuapp == 'home') {this.globals.menu = 'home'}
    else {this.globals.menu = this.menuapp;}
  }

  Event(){
    this.globals.menu = 'home';
    this.site = 'carrinho';
  }

  Meucarrinho(){
    if(this.globals.menu == 'home'){
    this.globals.menu = 'site';}
    else if (this.globals.menu == 'site') {
          this.globals.menu = 'home';}
        else {this.globals.menu = 'home';}
    this.site = 'carrinho';
  }

  


}

