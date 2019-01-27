import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ColsparserComponent} from './colsparser/colsparser.component';
import {LoginComponent} from './login/login.component';
import {ProjectComponent} from './project/project.component';
import {RegisterComponent} from './register/register.component';
import {TaskComponent} from './task/task.component';
import {NewprojectComponent} from './newproject/newproject.component';
import {EditprojectComponent} from './editproject/editproject.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'projects', component: ProjectComponent},
  {path: 'project/:hid', component: TaskComponent},
  // { path: 'colsparser', component: ColsparserComponent}
  {path: 'register', component: RegisterComponent},
  {path: 'newproject', component: NewprojectComponent},
  {path: 'editproject/:hid', component: EditprojectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
