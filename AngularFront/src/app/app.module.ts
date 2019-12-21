import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { TodoComponent } from './todo/todo.component';
import { NavComponent } from './nav/nav.component';
import { PaginationModule} from 'ngx-bootstrap';
import { UsersResolver } from './_resolvers/users.resolver';
import { TodosResolver } from './_resolvers/todos.resolver';
import { AllUsersResolver } from './_resolvers/allUsers.resolver';
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    RegisterComponent,
    TodoComponent,
    TodoFormComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    PaginationModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000','localhost:5001'],
        blacklistedRoutes: ['localhost:5000/api/auth','localhost:5001/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard, UsersResolver, TodosResolver, AllUsersResolver
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
