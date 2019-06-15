import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {resolve} from 'q';
import {empty, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {ConfirmdialogComponent, DialogData} from '../confirmdialog/confirmdialog.component';
import {Project} from '../project';
import {ProjectService} from '../project.service';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  projectid: string;
  tasks: Task[];
  isableDeleteTask: boolean = true;
  selection = new SelectionModel(true, []);
  constructor(
      private userService: UserService, private projectService: ProjectService,
      private taskService: TaskService, private route: ActivatedRoute,
      private router: Router, public dialog: MatDialog) {}

  displayedColumns: string[] =
      ['select', 'projectid', 'taskid', 'method', 'status', 'createdat'];

  ngOnInit() {
    this.route.paramMap
        .pipe(switchMap((params: ParamMap) => of(params.get('projectid'))))
        .subscribe((d) => {
          this.projectid = d;

          if (!this.userService.status == true) {
            let promise = this.userService.LoadSession();
            promise.then(status => {
              if (status == true) {
                this.Refresh(this.projectid);
              } else {
                this.router.navigate(['/login']);
              }
            })
          } else {
            this.Refresh(this.projectid);
          }
        });
  }

  Refresh(projectid: string) {
    this.taskService.getTasks(this.projectid).then(tasks => {
      this.tasks = tasks;
      console.log(this.tasks);
    });
  }

  downloadTask(tid: string) {
    let link = 'http://193.112.75.169:8007/' + tid + '/' + tid + '.tar';
    window.open(link, '_blank');
  }

  showTask(tid: string) {
    // let link = 'http://193.112.75.169:8007/' + tid + '/' +
    //     '.report';
    let link = 'http://result.hitdic.com/#/result/' + tid;
    window.open(link, '_blank');
  }

  /*The following function is used for uploading filenngs*/
  /**
   * Whether the number of selected elements matches the total number of rows.
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tasks.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection.
   */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.tasks.forEach(row => this.selection.select(row));
  }

  DeleteTask(taskid: string) {
    let promise = new Promise<boolean>((resolve, reject) => {
      const dialogRef = this.dialog.open(ConfirmdialogComponent, {
        width: '60%',
        data:
            {choice: true, msg: 'You are going to DELETE a task: ' + taskid}
      });

      dialogRef.afterClosed().subscribe(result => {
        // this.choice = true;
        console.log(result);
        if (result) {
          this.taskService.DeleteTask(
              this.userService.user.username, this.userService.user.token,
              taskid);
          resolve(result);
        } else {
          resolve(false);
        }
      });
    });
    return promise;
  }

  DeleteTasks() {
    this.isableDeleteTask = false;
    // console.log(this.selection);
    let promises = [];
    this.tasks.forEach(row => {
      if (this.selection.isSelected(row)) {
        console.log(row);
        let apromise = this.DeleteTask(row.taskid);
        promises.push(apromise);
      }
      // this.selection.select(row);
    });
    Promise.all(promises).then(
      status => {
        window.location.reload();
      }
    );

    // window.location.reload();
  }
}
