import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';

import {MessageService} from './message.service';
import {Project} from './project';
import {Task} from './task';
import {URL_createtask, URL_deletetask, URL_gettask, URL_gettasks} from './urls';
import {User} from './user';
import {UserService} from './user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};


@Injectable({providedIn: 'root'})
export class TaskService {
  task: Task;
  tasks: Task[];
  status: boolean;

  constructor(
      private http: HttpClient, private userService: UserService,
      private messageService: MessageService, private router: Router) {}

  CreateTask(
      projectid: string, title: string, note: string, method: string,
      corenumber: number, server: string) {
    if (!(title && note && method && corenumber)) {
      this.messageService.set('Invalid Project information');
      return;
    }
    console.log("projectid for creating task: ", projectid)
    this.http
        .post(
            URL_createtask, {
              projectid: projectid,
              title: title,
              note: note,
              method: method,
              corenumber: corenumber,
              server: server
            },
            httpOptions)
        .subscribe((response) => {
          console.log('response in creating project: ', response);
          this.status = response['status'];
          if (this.status == true) {
            window.location.reload();
          } else {
            this.messageService.set(response['msg']);
          }
        });
  }

  DeleteTask(username: string, token: string, taskid: string) {
    if (!taskid) {
      this.messageService.set('Invalid project token');
      return;
    }

    let promise = new Promise<Project>((resolve, reject) => {
      this.http.post(URL_deletetask, {username: username, token: token, taskid: taskid}, httpOptions)
          .toPromise()
          .then((response) => {
            this.status = response['status'];
            if (this.status == true) {
              this.messageService.set(
                  'Successfully delete the task: ' + taskid);
            } else {
              this.messageService.set(response['msg']);
            }
            resolve(response['taskid']);
          });
    });

    return promise;
  }

  getTask(taskId: string): Observable<Task> {
    if (!taskId) {
      this.messageService.set('Invalid project token');
      return;
    }

    this.http.post(URL_gettask, {'taskid': taskId}, httpOptions)
        .subscribe((response) => {
          this.status = response['status'];
          if (this.status == true) {
            return of(response['task']);
          } else {
            this.messageService.set(response['msg']);
          }
        });

    return;
  }

  getTasks(projectid: string) {
    if (!projectid) {
      this.messageService.set('Invalid project token!');
      return new Promise<Task[]>((resolve, reject) => {
        return [];
      })
    }

    let promise = new Promise<Task[]>((resolve, reject) => {
      this.http
          .post(
              URL_gettasks, {projectid: projectid},
              httpOptions)
          .toPromise()
          .then((response) => {
            this.status = response['status'];
            if (this.status == false) {
              this.messageService.set(response['msg']);
            } else {
              this.tasks = response["tasks"];
            }
            resolve(this.tasks);
          });
    });

    // this.http.post(URL_gettasks, {'projectid': projectid}, httpOptions)
    //     .subscribe((response) => {
    //       this.status = response['status'];
    //       if (this.status == true) {
    //         return of(response['tasks']);
    //       } else {
    //         this.messageService.set(response['msg']);
    //       }
    //     });

    return promise;
  }
}
