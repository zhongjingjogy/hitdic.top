import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {HitdicserviceService} from '../hitdicservice.service';
import {Project} from '../project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[];
  constructor(
      private hitdicservice: HitdicserviceService,
      private route: ActivatedRoute, private router: Router) {
    // console.log("in project constructor");
  }

  ngOnInit() {
    // console.log("in project OnInit");
    if (!this.hitdicservice.status) {
      this.router.navigate(['/login']);
    }

    this.projects = this.hitdicservice.projects;
    if (!this.projects) {
      console.log(this.projects);
      console.log(
          'Fail to retreive the project information, please login again!');
    }
  }

  listTasks(hid: string) {
    this.router.navigate(['/project/' + hid]);
  }
}
