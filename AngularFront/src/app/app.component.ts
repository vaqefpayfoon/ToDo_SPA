import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/user';
import { Router } from '@angular/router';
import { TodoService } from './_services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService, private router: Router, private todoService: TodoService) {}
  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    } else {
      this.router.navigate(['/login']);
    }
    if (user) {
      this.authService.currentUser = user;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
