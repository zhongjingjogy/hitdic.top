import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HitdicserviceService } from './hitdicservice.service';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatIconModule, MatMenuModule, MatToolbarModule, MatCardModule, MatBadgeModule, MatChipsModule, MatDividerModule, MatListModule, MatTableModule, MatProgressSpinnerModule, MatSidenavModule, MatTabsModule, MatExpansionModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { RegisterComponent } from './register/register.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TasklistComponent } from './tasklist/tasklist.component';

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectComponent,
    TaskComponent,
    RegisterComponent,
    TasklistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule, 
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatBadgeModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatCheckboxModule,
    FileUploadModule,
    MatTabsModule,
    MatExpansionModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule, 
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatBadgeModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatTabsModule,
    MatExpansionModule
  ],
  providers: [
    HitdicserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
