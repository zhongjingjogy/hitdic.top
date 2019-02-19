import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {ProjectComponent} from './project/project.component';
import {RegisterComponent} from './register/register.component';
import {ProjectlistComponent} from "./projectlist/projectlist.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'projects', component: ProjectlistComponent},
  {path: 'project/:projectid', component: ProjectComponent},
  {path: 'register', component: RegisterComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
