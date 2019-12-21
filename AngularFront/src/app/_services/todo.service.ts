import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { environment } from '../../environments/environment';
import { StringModel, NameModel } from '../_models/dropDown';
import { ToDo } from '../_models/toDo';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = environment.apiUrl + 'todo';

  constructor(private http: HttpClient) {}
  toDo: ToDo;
  toDos: ToDo[];
  users: User[];
  getTodos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.baseUrl + "/getTodos", { observe: 'response'})
    .pipe(map((response: any) => { this.toDos = response.body;
      return this.toDos;
    }));
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "/getUsers", { observe: 'response'})
    .pipe(map((response: any) => { this.users = response.body;
      return this.users;
    }));
  }
  getAllTodos(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<ToDo[]>> {
    const paginatedResult: PaginatedResult<ToDo[]> = new PaginatedResult<ToDo[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams != null) {
      params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<ToDo[]>(this.baseUrl + "/getAllTodos", { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getAllUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams != null) {
      params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<User[]>(this.baseUrl + "/getUsers", { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getTodo(key, field) {
    let params = new HttpParams();
    params = params.append('key', key);
    params = params.append('field', field);
    return this.http.get<ToDo>(this.baseUrl + "/getTodo", { observe: 'response', params}).pipe(
      map((response: any) => {
      this.toDo = response.body.productDto;
      return this.toDo;
    }));
  }

  toDoId: number;
  saveTodo(model: ToDo) {
    return this.http.post(this.baseUrl + '/saveTodo', model, {observe: 'response'}).pipe(
      map((response: any) => {
        const toDo = response.body;
        this.toDoId = toDo.id;
      })
    );
  }

  updateTodo(model: ToDo) {
    return this.http.post(this.baseUrl + '/updateTodo', model, {observe: 'response'}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteTodo(name: NameModel) {
    return this.http.post(this.baseUrl + '/deleteTodo', name, {observe: 'response'}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

}
