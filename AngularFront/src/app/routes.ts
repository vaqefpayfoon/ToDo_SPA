import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TodoComponent } from './todo/todo.component';

import { UsersResolver } from './_resolvers/users.resolver';
import { TodosResolver } from './_resolvers/todos.resolver';
import { TodoResolver } from './_resolvers/todo.resolver';
import { AllUsersResolver } from './_resolvers/allUsers.resolver';

export const appRoutes: Routes = [
  {path: '', component: IndexComponent,
   resolve:{toDo: TodosResolver, user: UsersResolver}},
  {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
          {path: 'todo', component: TodoComponent, resolve: {toDo: AllUsersResolver}},
      ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
