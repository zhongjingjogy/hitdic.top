import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {Project} from '../project';
import {ProjectService} from '../project.service';
import {UserService} from '../user.service';
import {DialogData, ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent implements OnInit {
  projects: Project[];
  choice: boolean = false;

  constructor(
      private userService: UserService, private projectService: ProjectService,
      private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    if (!this.userService.status == true) {
      let promise = this.userService.LoadSession();
      promise.then(status => {
        if (status == true) {
          this.Refresh();
        } else {
          this.router.navigate(['/login']);
        }
      })
    } else {
      this.Refresh();
    }
  }

  Refresh() {
    this.projectService.getProjects().then(
        projects => this.projects = projects);
  }

  ListTasks(projectid: string) {
    this.router.navigate(['/project/' + projectid]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(
        ConfirmdialogComponent,
        {width: '250px', data: {choice: this.choice}});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.choice = true;
      console.log(result);
      if (result) {
        this.choice = true;
        console.log('choice is ' + this.choice);
      }
    });
  }

  DeleteProject(projectid: string) {
    console.log('project: ' + projectid);
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      width: '60%',
      data: {
        choice: this.choice,
        msg: 'You are going to DELETE a project: ' + projectid
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.choice = true;
      console.log(result);
      if (result) {
        this.choice = true;
        this.projectService.deleteProject(
            this.userService.user.username, this.userService.user.token,
            projectid);
        window.location.reload();
      }
    });
  }
}
