import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {empty, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {HitdicserviceService} from '../hitdicservice.service';
import {MessageService} from '../message.service';
import {Project} from '../project';
import {ProjectService} from '../project.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {
  projectid: string;
  project: Project;

  constructor(
      private userService: UserService, private messageService: MessageService,
      private projectService: ProjectService, private route: ActivatedRoute,
      private router: Router) {
    // console.log("in project constructor");
  }

  ngOnInit() {
    this.messageService.set('');
    this.route.paramMap
        .pipe(switchMap((params: ParamMap) => of(params.get('projectid'))))
        .subscribe((d) => {
          this.projectid = d;
          this.Refresh(this.projectid);
        });
  }

  Refresh(projectid: string) {
    this.projectService.getProject(projectid).then(
        project => this.project = project);
  }
}
