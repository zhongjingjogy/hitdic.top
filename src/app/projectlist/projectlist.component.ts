import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {Project} from '../project';
import {ProjectService} from '../project.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent implements OnInit {
  projects: Project[];

  constructor(
      private userService: UserService, private projectService: ProjectService,
      private router: Router) {}

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
}
