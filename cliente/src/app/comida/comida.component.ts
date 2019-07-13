import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Comida } from '../models/Comida';
import { Personagem } from '../models/Personagem';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css']
})
export class ComidaComponent implements OnInit {
  private personagemId: number;
  private Url = 'http://localhost:8000/personagem/';
  private comidas = Array<Comida>();
  personagem: Personagem

  
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.personagemId = +this.route.snapshot.paramMap.get('personagemid');
    this.getDados()
    
  }

  getDados() {
    this.http.get(this.Url + this.personagemId).subscribe(response => this.readResponse(response))
  }

  readResponse(response): void {
    console.log(response)
    this.personagem = new Personagem(response["personagem"].id, response["personagem"].nome, response["personagem"].vida, response["personagem"].classe )
    console.log(this.personagem)
    for (const comida of response["comidas"]) {
      this.comidas.push(new Comida(comida.id, comida.nome, comida.nutrientes, comida.saudavel));
    }
    console.log(this.comidas);
  }

  comer(comidaId: Number){
    this.http.get(this.Url + this.personagemId+ "/comida/" + comidaId + "/alimentar/").subscribe(response => window.location.reload())

  }

  trocarDeClasse(classe: string){
    this.http.post(this.Url + this.personagemId+ "/trocadeclasse/",{classe: classe}).subscribe(response => window.location.reload())

  }



}
