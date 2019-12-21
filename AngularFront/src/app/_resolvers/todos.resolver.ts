import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ToDo } from '../_models/toDo';
import { TodoService } from '../_services/todo.service';
import { catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class TodosResolver implements Resolve<ToDo[]> {

  constructor(private userService: TodoService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ToDo[]> | Promise<ToDo[]> | ToDo[] {
      return this.userService.getTodos().pipe(catchError(error => {
        return of(null)}));
  }
}
