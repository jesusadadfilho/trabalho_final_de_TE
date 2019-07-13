import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { Personagem } from '../models/Personagem';
import { Response } from 'selenium-webdriver/http';

@Component({
  selector: 'app-personagem',
  templateUrl: './personagem.component.html',
  styleUrls: ['./personagem.component.css']
})
export class PersonagemComponent implements OnInit {

  private Url = 'http://localhost:8000/personagem/';
  private personagens = Array<Personagem>();
  
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getPersonagens()
  }

  criar(n: string, vi: number, cla: string) {
    this.http.post(this.Url,
        {nome: n, vida: vi, classe: cla}).subscribe(
        response => window.location.reload(),
        error1 => console.log(error1)
    );
  }

  getPersonagens(){
    this.http.get(this.Url).subscribe(response => this.readResponse(response))
  }

  readResponse(response){
    for (const personagem of response) {
      this.personagens.push(new Personagem(personagem.id, personagem.nome, personagem.vida, personagem.classe));
    }
    console.log(this.personagens);
  }

}
