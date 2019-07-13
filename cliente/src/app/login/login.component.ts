import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;

  constructor(private router: Router,  private authService: AuthService) { }
  

  ngOnInit() {
  }


  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      success => this.router.navigate(['personagens']),
      error => this.error = error
    );
  }
}
