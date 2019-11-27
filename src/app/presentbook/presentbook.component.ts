import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/book'

@Component({
  selector: 'app-presentbook',
  templateUrl: './presentbook.component.html',
  styleUrls: ['./presentbook.component.css']
})
export class PresentbookComponent implements OnInit {
  @Input() book: Book;
  @Input('autores') autores: string[];
  @Input('categorias') categorias: string[];
  @Output() mudar = new EventEmitter(); 
  i:number;
  menu: string = 'present';

  constructor() { 

  }

  ngOnInit() {
 }

 alteramenu(a: string){
  this.menu=a;

 }

 addcarrinho(){
    this.mudar.emit(this.book.ISBN);

 }

  
}
