import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/book'  

@Component({
  selector: 'app-bookrow',
  templateUrl: './bookrow.component.html',
  styleUrls: ['./bookrow.component.css']
})
export class BookrowComponent implements OnInit {
  @Input('book') book: Book[];
  @Output('selected') selected = new EventEmitter();
  img: string;
  constructor() { }

  ngOnInit() {
    this.img = 'present'
  }
  
  apresenta(e: number){
    this.selected.emit(e);

  }

}
