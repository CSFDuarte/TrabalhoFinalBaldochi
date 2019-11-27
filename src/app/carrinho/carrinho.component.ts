import { Component, OnInit, Input } from '@angular/core';
import { Globals } from 'src/app/globals'
import { Book } from 'src/app/book'
import { Carrinho } from 'src/app/carrinho'
import { Historico } from 'src/app/historico'
import {  HttpClient  } from '@angular/common/http'

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  books: Book[] = [];
  booksnodup: Book[] = [];
  resposta: any;
  carrinho: Carrinho [];
  i:number;
  x:number;
  totalcompra: number;
  subtotal:number;
  idpedido: number;
  body: any;
  item: Historico[] = [];
  request: any;
  menucarrinho: string = 'car';
  ordernate: string;
  z: number;
  constructor(private globals: Globals, private httpClient: HttpClient) { }

  ngOnInit() {
    const req = this.httpClient.get("http://127.0.0.1:3000/consulta/livros").toPromise();
    
    
    req.then((resposta) => {
      this.resposta = resposta;
      this.booksnodup = [];
      for (this.i=0; this.i<this.resposta.length; this.i++){
        this.books.push(new Book(this.resposta[this.i].ISBN, this.resposta[this.i].title, this.resposta[this.i].description, this.resposta[this.i].price, this.resposta[this.i].publisher, this.resposta[this.i].pubdate, this.resposta[this.i].edition, this.resposta[this.i].pages, this.resposta[this.i].CategoryName, this.resposta[this.i].nameF, this.resposta[this.i].nameL ));
        
      } 
      this.booksnodup = this.remove_duplicates(this.books);
      this.carrinho=[]
      console.log(this.globals.ISBNcarrinho)
      this.foo(this.globals.ISBNcarrinho)
    })



  }

  foo(arr: number[]) {
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
        console.log(prev)
    }
    
    for(this.x=0;this.x<a.length;this.x++){
    for(this.i=0;this.i<this.booksnodup.length;this.i++){
        if(a[this.x] == this.booksnodup[this.i].ISBN){
          this.carrinho.push(new Carrinho(this.booksnodup[this.i].ISBN, this.booksnodup[this.i].title, this.booksnodup[this.i].price, b[this.x], (Math.round((this.booksnodup[this.i].price * b[this.x]) * 100) / 100)))
        }
      }
    }
    this.total();
}

  add(ISBN: number){
    this.globals.ISBNcarrinho.push(ISBN);
    this.carrinho=[];
    this.foo(this.globals.ISBNcarrinho);

  }

  remove(ISBN: number){
    for(this.x=0; this.x<this.globals.ISBNcarrinho.length; this.x++){
      if(this.globals.ISBNcarrinho[this.x]==ISBN){
        this.globals.ISBNcarrinho.splice(this.x, 1);
        break;
      }
    }
    this.carrinho=[];
    this.foo(this.globals.ISBNcarrinho);
  }

  total(){
    this.totalcompra = 0;
    for(this.x=0;this.x<this.carrinho.length;this.x++){
      this.totalcompra += this.carrinho[this.x].price * this.carrinho[this.x].quantidade
    }
    this.totalcompra = Math.round(this.totalcompra * 100) / 100
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

  fecharpedido(){
    this.body = {};
    this.idpedido = Math.floor(Math.random() * (999999 - 2) + 2);
    this.body.orderID = this.idpedido;
    this.body.custID = this.globals.IDuser;
    this.body.ordernate = new Date().toLocaleString();
    const req = this.httpClient.post("http://127.0.0.1:3000/add/order", this.body).toPromise()
    req.then((resposta) => {
      this.resposta = resposta;
      for(this.x=0; this.x<this.carrinho.length;this.x++){   
        this.body = {}
        this.body.orderID = this.idpedido;
        this.body.ISBN = this.carrinho[this.x].ISBN;
        this.body.quantidade = this.carrinho[this.x].quantidade;
        this.body.price = this.carrinho[this.x].price;
        const reqq = this.httpClient.post("http://127.0.0.1:3000/add/orderitem", this.body).toPromise()
        reqq.then((resposta) => {}); 
      }
    });

    this.historico();
  }


  historico(){
    const req = this.httpClient.get("http://127.0.0.1:3000/consulta/order/" + this.globals.IDuser).toPromise();
    req.then((resposta) => {
      this.resposta = resposta;

      for(this.x=0; this.x< this.resposta.length; this.x++){
        this.request = this.httpClient.get("http://127.0.0.1:3000/consulta/orderitem/" + this.resposta[this.x].orderID).toPromise();
        this.request.then((respostaa)=>{
          
          
          for(this.i=0;this.i<respostaa.length;this.i++){
          
            for(this.z=0; this.z< this.resposta.length; this.z++){
              
              if(this.resposta[this.z].orderID == respostaa[this.i].orderID){this.ordernate = this.resposta[this.z].ordernate; }
            }
          
          this.item.push(new Historico (respostaa[this.i].orderID, respostaa[this.i].ISBN, respostaa[this.i].qty, respostaa[this.i].price, (respostaa[this.i].price * respostaa[this.i].qty), this.ordernate))

        }})
      }
      })
      this.menucarrinho = 'historico';

  }
  
}
