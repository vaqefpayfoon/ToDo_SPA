import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  userUrl = environment.apiUrl + 'user/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  userId: any;
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          console.log(this.decodedToken);
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user, {observe: 'response'}).pipe(map(
      (response: any) => {
        const createdUser = response.body;
         this.userId = createdUser.id;
      }
    ));
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + id);
  }
}
