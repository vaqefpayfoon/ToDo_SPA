import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TodoService } from '../_services/todo.service';
import { ToDo } from '../_models/toDo';


@Injectable()
export class AllUsersResolver implements Resolve<ToDo[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private todoService: TodoService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ToDo[]> {
        return this.todoService.getAllTodos(this.pageNumber, this.pageSize)
        .pipe(catchError(error => {
                this.router.navigate(['/pages/base-information/login']);
                return of(null);
            })
        );
    }
}
