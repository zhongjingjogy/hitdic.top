import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {empty, Observable, of} from 'rxjs';

import {Project} from './project';

@Injectable({providedIn: 'root'})
export class HitdicserviceService {
  token: string;
  status: boolean;
  projects: Project[];
  constructor(
      private http: HttpClient,
      private route: ActivatedRoute,
      private router: Router,
  ) {
    this.status = false;
  }

  setToken(token: string) {
    this.token = token;
    this.login();
  }

  login() {
    if (this.token) {
      this.http.get('http://193.112.75.169:8006/token_verify/' + this.token)
          .subscribe((response) => {
            console.log(response);
            if (response['status'] == 'OK') {
              this.status = true;
              this.getProjects();

              console.log('Token is valid!');
            } else {
              alert(response['status']);
            }
          })
    }
  }

  getProjects() {
    this.http.get('http://193.112.75.169:8006/projects/' + this.token)
        .subscribe((response) => {
          this.projects = response['projects'];
          this.router.navigate(['/projects']);
        });
  }

  getProject(hid: string) {
    return this.http.get('http://193.112.75.169:8006/project/' + hid);
  }

  getProjectTasks(hid: string) {
    return this.http.get('http://193.112.75.169:8006/tasks/' + hid);
  }

  register(email, note) {
    const httpOptions = {
      headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})
    };

    let formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('note', note);

    this.http
        .post(
            'http://http://193.112.75.169:8006/register', formData, httpOptions)
        .subscribe((res) => {
          console.log(res);
        });
  }
}
