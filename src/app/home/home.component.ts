import { Component, OnInit, Input } from '@angular/core';
import {  HttpClient  } from '@angular/common/http'
import { Book } from 'src/app/book';
import { Globals } from 'src/app/globals'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input('site') site: string;
  books: Book[] = [];
  booksnodup: Book[] = [];
  bookspesquisados: Book[] = [];
  bookrandom: Book[] = [];
  bookpresent: Book;
  booksnoduppesquisa: Book[] = [];
  autores: string[] = [];
  categorias: string[] = [];
  category: any;
  resposta: any;
  obj: any;
  i:number;
  pesquisa: string;
  indicepesquisa: number[] = [];
  homepage: string;
  ISBNpresent: number;
  constructor(private httpClient: HttpClient, private globals: Globals) { 
  }
  
  ngOnInit() {
    this.homepage = this.site;

    const req = this.httpClient.get("http://127.0.0.1:3000/consulta/livros").toPromise();
    
    
    req.then((resposta) => {
      this.resposta = resposta;
      this.booksnodup = [];
      for (this.i=0; this.i<this.resposta.length; this.i++){
        this.books.push(new Book(this.resposta[this.i].ISBN, this.resposta[this.i].title, this.resposta[this.i].description, this.resposta[this.i].price, this.resposta[this.i].publisher, this.resposta[this.i].pubdate, this.resposta[this.i].edition, this.resposta[this.i].pages, this.resposta[this.i].CategoryName, this.resposta[this.i].nameF, this.resposta[this.i].nameL ));
        
      } 
      this.booksnodup = this.remove_duplicates(this.books);
      this.bookRand(this.booksnodup);
    })
    
    const reqq = this.httpClient.get("http://127.0.0.1:3000/consulta/category").toPromise();
    
    reqq.then((resposta) => {
      this.category = resposta;
    })
    
    
    
  }
  
  salvar(){
    this.bookspesquisados = [];
    this.booksnoduppesquisa = [];
    
    if(this.pesquisa != undefined && this.pesquisa != null){
    this.homepage='pesquisa';
    for(this.i=0; this.i<this.books.length; this.i++){

      if (this.books[this.i].title.toLowerCase().includes(this.pesquisa.toLowerCase()) || this.books[this.i].ISBN.toString().toLowerCase().includes(this.pesquisa.toLowerCase()) ||  this.books[this.i].description.toLowerCase().includes(this.pesquisa.toLowerCase())  || this.books[this.i].publisher.toLowerCase().includes(this.pesquisa.toLowerCase()) || this.books[this.i].pubdate.toLowerCase().includes(this.pesquisa.toLowerCase())  || this.books[this.i].categoryName.toLowerCase().includes(this.pesquisa.toLowerCase()) || this.books[this.i].authorFname.toLowerCase().includes(this.pesquisa.toLowerCase()) || this.books[this.i].authorLname.toLowerCase().includes(this.pesquisa.toLowerCase())){
        this.bookspesquisados.push(this.books[this.i]);
      }
    }
    
    this.booksnoduppesquisa = this.remove_duplicates(this.bookspesquisados);
  }
  }
  
  remove_duplicates(arr: Book[]) {
    var seen = {};
    var ret_arr: Book[] = [];
    for (var i = 0; i < arr.length; i++) {
      if (!(arr[i].ISBN in seen)) {
        ret_arr.push(arr[i]);
        seen[arr[i].ISBN] = true;
      }
    }
    return ret_arr;
    
  }

  remove_duplicate_array(arr: string[]) {
    var seen = {};
    var ret_arr: string[] = [];
    for (var i = 0; i < arr.length; i++) {
      if (!(arr[i] in seen)) {
        ret_arr.push(arr[i]);
        seen[arr[i]] = true;
      }
    }
    return ret_arr;
    
  }
  
  bookRand(booknodup: Book[]){
    this.bookrandom = [];
    for(this.i=0; this.i<3;this.i++){
        
      this.bookrandom.push(booknodup[Math.floor(((Math.random() * (booknodup.length - 1)) + 1))])

    }
    this.bookrandom = this.remove_duplicates(this.bookrandom);
    if(this.bookrandom.length != 3){this.bookRand(this.booksnodup)}

  }

  mudahome(){
    this.homepage = 'home';
    this.bookRand(this.booksnodup);
  }
  
  pesquisar(categoria: string){
    this.bookspesquisados = [];
    this.booksnoduppesquisa  = [];
    
    this.homepage='pesquisa';
    for(this.i=0; this.i<this.books.length; this.i++){

      if (this.books[this.i].categoryName == categoria){
        this.bookspesquisados.push(this.books[this.i]);
      }
    }
    
    this.booksnoduppesquisa  = this.remove_duplicates(this.bookspesquisados);
  
  }

  present(ISBNpresent: number){
    for(this.i = 0; this.i<this.books.length; this.i++){
      if(ISBNpresent == this.books[this.i].ISBN){
        this.bookpresent = (this.books[this.i])
        this.autores.push(this.books[this.i].authorFname + ' ' + this.books[this.i].authorLname);
        this.categorias.push(this.books[this.i].categoryName);
      }
    }
    this.autores = this.remove_duplicate_array(this.autores);
    this.categorias = this.remove_duplicate_array(this.categorias);
    this.homepage='presentbook';
  
  }

  itemSelected(e: number){
    this.present(e);
  
}

  Event(e: number){
    this.globals.ISBNcarrinho.push(e);
    this.homepage='carrinho';

  }




}
