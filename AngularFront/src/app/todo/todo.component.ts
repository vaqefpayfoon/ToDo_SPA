import { Component, OnInit } from '@angular/core';
import { TodoService } from '../_services/todo.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToDo } from '../_models/toDo';
import { Pagination, PaginatedResult } from '../_models/pagination';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  toDos: ToDo[];
  pagination: Pagination;
  constructor(public toDoService: TodoService, private authService: AuthService,
    private route: ActivatedRoute) {
     this.route.data.subscribe(data => {
       this.toDos = data['toDo'].result;
       this.pagination = data['toDo'].pagination;
       }, error => {console.log(error)}, () => {

       }
     );
    }

  ngOnInit() {
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
  userParams: any;
  loadUsers() {
    this.toDoService.getAllTodos(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<ToDo[]>) => {
        this.toDos = res.result;
        this.pagination = res.pagination;
    }, error => {

    });
  }

}
