import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './project';
import { Observable, of, empty } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HitdicserviceService {

  token: string;
  status: boolean;
  projects: Project[];
  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router,) { 
    this.status = false;
  }

  setToken(token: string) {
    this.token = token;
    this.login();
  }

  login() {
    if(this.token) {
      this.http.get("http://193.112.75.169:8006/token_verify/" + this.token).subscribe((response) => {
        console.log(response);
        if(response["status"] == "OK") {
          this.status = true;
          this.getProjects();
          
          console.log("Token is valid!");
        } else {
          alert(response["status"]);
        }
      })
    }
  }

  getProjects() {
    this.http.get("http://193.112.75.169:8006/projects/" + this.token).subscribe(
      (response) => {
        this.projects = response["projects"];
        this.router.navigate(['/projects']);
      });
  }

  getProjectTasks(hid: string) {
    return this.http.get("http://193.112.75.169:8006/tasks/" + hid);
  }

}
