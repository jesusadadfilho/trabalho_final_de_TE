import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonagemComponent } from './personagem/personagem.component';
import { ComidaComponent } from './comida/comida.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonagemComponent,
    ComidaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
