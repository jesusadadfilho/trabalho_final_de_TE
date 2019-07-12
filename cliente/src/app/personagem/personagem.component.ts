import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personagem',
  templateUrl: './personagem.component.html',
  styleUrls: ['./personagem.component.css']
})
export class PersonagemComponent implements OnInit {

  private projetoUrl = 'http://localhost:8000/personagem/';
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  criar(n: string, vi: number, cla: string) {
    this.http.post(this.projetoUrl,
        {nome: n, vida: vi, classe: cla}).subscribe(
        response => this.router.navigate(['home']),
        error1 => console.log(error1)
    );
  }

}
