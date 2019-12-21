import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ToDo } from '../_models/toDo';
import { TodoService } from '../_services/todo.service';
import { catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class TodoResolver implements Resolve<ToDo> {

  constructor(private todoService: TodoService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ToDo> | Promise<ToDo> | ToDo {
    if(route.params['id'] != -1)
      return this.todoService.getTodo(route.params['id'], 'id');
    return null;
  }
}
