import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';

import {MessageService} from './message.service';
import {Project} from './project';
import {URL_createproject, URL_getproject, URL_getprojects, URL_isreadyprojectfile} from './urls';
import {User} from './user';
import {UserService} from './user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};


@Injectable({providedIn: 'root'})
export class ProjectService {
  status: boolean;
  project: Project;
  projects: Project[];

  constructor(
      private http: HttpClient, private userService: UserService,
      private messageService: MessageService, private router: Router) {}

  CreateProject(title: string, note: string) {
    if (!(title && note)) {
      this.messageService.set('Invalid Project information');
      return new Promise<boolean>((resolve, reject) => {
        resolve(false);
      })
    }
    this.project = new Project();
    this.project.title = title;
    this.project.note = note;

    let promise = new Promise<boolean>((resolve, reject) => {
      this.http
          .post(
              URL_createproject, {
                username: this.userService.user.username,
                token: this.userService.user.token,
                title: title,
                note: note
              },
              httpOptions)
          .toPromise()
          .then((response) => {
            this.status = response['status'];
            if (this.status == true) {
              this.messageService.set(
                  'Successfully create a project: ' + response['projectid']);
            } else {
              this.messageService.set(response['msg']);
            }
            resolve(this.status);
          });
    });

    return promise;
  }

  getProject(projectid: string) {
    if (!projectid) {
      this.messageService.set('Invalid project token');
      return;
    }

    let promise = new Promise<Project>((resolve, reject) => {
      this.http.post(URL_getproject, {projectid: projectid}, httpOptions)
          .toPromise()
          .then((response) => {
            this.status = response['status'];
            if (this.status == true) {
              this.messageService.set(
                  'Successfully retrieve information for the project: ' + projectid);
            } else {
              this.messageService.set(response['msg']);
            }
            resolve(response['project']);
          });
    });

    // this.http.post(URL_getproject, {'projectid': projectId}, httpOptions)
    //     .subscribe((response) => {
    //       this.status = response['status'];
    //       if (this.status == true) {
    //         return of(response['project']);
    //       } else {
    //         this.messageService.set(response['msg']);
    //       }
    //     });

    return promise;
  }

  getProjects() {
    if (!(this.userService.user.username && this.userService.user.token)) {
      this.messageService.set('Please login firstly!');
      return;
    }

    let promise = new Promise<Project[]>((resolve, reject) => {
      this.http
          .post(
              URL_getprojects, {
                'username': this.userService.user.username,
                'token': this.userService.user.token
              },
              httpOptions)
          .toPromise()
          .then((response) => {
            this.status = response['status'];
            if (this.status == true) {
              this.projects = response['projects'];
            } else {
              this.messageService.set(response['msg']);
            }
            resolve(this.projects);
          });
    });

    // this.http
    //     .post(
    //         URL_getprojects, {
    //           'username': this.userService.user.username,
    //           'token': this.userService.user.token
    //         },
    //         httpOptions)
    //     .subscribe((response) => {
    //       this.status = response['status'];
    //       if (this.status == true) {
    //         return of(response['projects']);
    //       } else {
    //         this.messageService.set(response['msg']);
    //       }
    //     });

    return promise;
  }

  IsReadyProjectFile(projectid: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };

    let promise = new Promise<boolean>((resolve, reject) => {
      this.http
          .post(URL_isreadyprojectfile, {projectid: projectid}, httpOptions)
          .toPromise()
          .then((response) => {
            this.status = response['status'];
            if (this.status == true) {
              
            } else {
              this.messageService.set(response['msg']);
            }
            resolve(this.status);
          });
    });

    // this.http
    //     .post(URL_isreadyprojectfile, {'projectid': projectId}, httpOptions)
    //     .subscribe((response) => {
    //       this.status = response['status'];
    //       if (this.status == true) {
    //         return of(response['status']);
    //       } else {
    //         this.messageService.set(response['msg']);
    //       }
    //     });

    return promise;
  }
}
