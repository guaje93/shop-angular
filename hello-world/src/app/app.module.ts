import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { AlertModule } from 'ngx-bootstrap';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { CardService } from './services/card.service';
import { HttpClientModule } from '@angular/common/http'; 

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ProductService,
    CategoryService,
    CardService
  ],
  bootstrap: [AppComponent]
  
})

export class AppModule { }