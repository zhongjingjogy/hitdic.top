import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HitdicserviceService } from './hitdicservice.service';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatIconModule, MatMenuModule, MatToolbarModule, MatCardModule, MatBadgeModule, MatChipsModule, MatDividerModule, MatListModule, MatTableModule, MatProgressSpinnerModule, MatSidenavModule, MatTabsModule, MatExpansionModule, MatOptionModule, MatSelectModule, MatDialogModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { ProjectComponent } from './project/project.component';
import { RegisterComponent } from './register/register.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TasklistComponent } from './tasklist/tasklist.component';
import { NewprojectComponent } from './newproject/newproject.component';
import { NewtaskComponent } from './newtask/newtask.component';
import { MessageComponent } from './message/message.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { NavheaderComponent } from './navheader/navheader.component';
import { HomeComponent } from './home/home.component';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';
import { AdminComponent } from './admin/admin.component'

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
    RegisterComponent,
    TasklistComponent,
    NewprojectComponent,
    NewtaskComponent,
    MessageComponent,
    ProjectlistComponent,
    UploadfileComponent,
    NavheaderComponent,
    HomeComponent,
    ConfirmdialogComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
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
    MatExpansionModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatGridListModule
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
    MatExpansionModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule
  ],
  providers: [
    HitdicserviceService
  ],
  entryComponents: [
    ConfirmdialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
