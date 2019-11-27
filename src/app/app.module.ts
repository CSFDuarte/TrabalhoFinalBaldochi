import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {Globals} from './globals';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloginComponent } from './prelogin/prelogin.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BookrowComponent } from './bookrow/bookrow.component';
import { PresentbookComponent } from './presentbook/presentbook.component';
import { PresentsiteComponent } from './presentsite/presentsite.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';


@NgModule({
  declarations: [
    AppComponent,
    PreloginComponent,
    HomeComponent,
    BookrowComponent,
    PresentbookComponent,
    PresentsiteComponent,
    CarrinhoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }


