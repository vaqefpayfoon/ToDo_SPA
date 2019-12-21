import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TodoService } from '../_services/todo.service';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';


@Injectable({ providedIn: 'root' })

export class UsersResolver implements Resolve<User[]> {

  constructor(private todoService: TodoService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User[]> | Promise<User[]> | User[] {
    return this.todoService.getUsers().pipe(catchError(error => {
      return of(null);
    }));
  }
}
