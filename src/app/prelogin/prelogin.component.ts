import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from 'src/app/globals';
import {Usuario} from 'src/app/usuario'

@Component({
  selector: 'app-prelogin',
  templateUrl: './prelogin.component.html',
  styleUrls: ['./prelogin.component.css']
})
export class PreloginComponent implements OnInit {
  @Output() botao = new EventEmitter();
  usuario: any;
  resposta: any;
  private menuprelogin: string;
  premenu: string = 'new';
  users: Usuario[] = [];
  i: number;

  
  constructor( private httpClient: HttpClient, private globals: Globals) {
    this.menuprelogin = globals.menu;
   }

  ngOnInit() {
    this.usuario = {};
    this.resposta = {};
  }


  salvar() {
    const req = this.httpClient.get("http://127.0.0.1:3000/consulta/usuario/" + this.usuario.email).toPromise();
    
    req.then((resposta) => {
      this.resposta = resposta;
      for (this.i=0; this.i<this.resposta.length; this.i++){
        this.users.push(new Usuario(this.resposta[this.i].custID, this.resposta[this.i].fname, this.resposta[this.i].lname, this.resposta[this.i].email, this.resposta[this.i].street, this.resposta[this.i].city, this.resposta[this.i].state, this.resposta[this.i].zip));
        }
      if(this.resposta.length != 0 ){this.premenu = 'user';}
      else {this.premenu = 'notuser';}
      })

  }

  salvarusuario(){
    const req = this.httpClient.post("http://127.0.0.1:3000/add/usuario", this.usuario).toPromise();

    req.then((resposta) => {
      this.resposta = resposta;
      this.getID();
    }).catch((erro) => {
      this.resposta = erro;
    
    });
    
  }

  getID(){
    const req = this.httpClient.get("http://127.0.0.1:3000/consulta/usuario/" + this.usuario.email).toPromise();
    req.then((resposta) => {
      this.resposta = resposta[0];
      this.globals.IDuser = this.resposta.custID;
      this.botao.emit();
      })


  }


}


