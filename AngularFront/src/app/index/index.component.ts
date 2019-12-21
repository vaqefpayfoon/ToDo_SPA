import { Component, OnInit } from '@angular/core';
import { TodoService } from '../_services/todo.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { DropDown, StringModel } from '../_models/dropDown';
import { ToDo } from '../_models/toDo';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../_models/user';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public toDoService: TodoService, private fb: FormBuilder, private authService: AuthService,
     private route: ActivatedRoute) {
      this.route.data.subscribe(data => {
        this.toDos = data['toDo'];
        this.users = data['user'];
        }, error => {console.log(error)}, () => {

        }
      );
     }

  saveState: string = "0";
  toDo: ToDo;
  toDos: ToDo[];
  toDoForm: FormGroup;
  users: User[];
  err: string = "عملیات ناموفق";
  ngOnInit() {

    this.createBaseForm();
  }
  toDoControls = new FormArray([]);
  createBaseForm() {

    if(this.toDos)
    {
      if(this.toDos.length > 0)
      {
        for(let todo of this.toDos) {
          this.toDoControls.push(
            new FormGroup({
              'id': new FormControl(todo.id),
              'taskName': new FormControl(todo.taskName, Validators.required),
              'userId': new FormControl(todo.userId, Validators.required),
              'finish': new FormControl(todo.finish),
            })
          );

        }
      }
    }

    this.toDoControls.push(
      new FormGroup({
        'id': new FormControl(null),
        'taskName': new FormControl(null),
        'userId': new FormControl(null),
        'finish': new FormControl(null),
      })
    );

    this.toDoForm = new FormGroup({
      'todosItem': this.toDoControls
    });

  }

  onAddTodo(index: number) {
    let toDoId : number;
    var items = this.toDoForm.value.todosItem;
    this.toDo = (<FormArray>this.toDoForm.get('todosItem')).controls[index].value;
    this.toDo.id = 0;
    this.toDoService.saveTodo(this.toDo).subscribe(() => {
      toDoId = this.toDoService.toDoId;
      this.toDo.id = this.toDoService.toDoId;
      let frmArray = this.toDoForm.get("todosItem") as FormArray;
      var item = frmArray.at(index);
      item.patchValue({id: this.toDoService.toDoId});
    } ,
    error => console.log(error), () => {

    });
    (<FormArray>this.toDoForm.get('todosItem')).push(
      new FormGroup({
        'id': new FormControl(null),
        'taskName': new FormControl(null),
        'userId': new FormControl(null),
        'finish': new FormControl(null),
      })
    );
    this.saveState = "1";
  }
  onDeleteTodo(index: number) {
    var item = (<FormArray>this.toDoForm.get('todosItem')).controls[index].value;
    (<FormArray>this.toDoForm.get('todosItem')).removeAt(index);
    if(item.id == null) {
      this.saveState = "2";
      this.err = "عملیات ناموفق"
    } else {
      let stringModel: StringModel = {id: item.id, name: item.taskName};
      this.toDoService.deleteTodo(stringModel).subscribe(() => {});
      this.saveState = "1";
    }
  }
  onUpdateTodo(index: number) {
    var item = (<FormArray>this.toDoForm.get('todosItem')).controls[index].value;
    if(item.id == null) {
      this.saveState = "2";
      this.err = "عملیات ناموفق"
    } else {
      this.toDoService.updateTodo(item).subscribe(() => {});
      this.saveState = "1";
    }
  }
  getControls() {
    return (<FormArray>this.toDoForm.get('todosItem')).controls;
  }

}
