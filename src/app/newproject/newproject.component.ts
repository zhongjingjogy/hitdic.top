import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {empty, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {ProjectService} from '../project.service';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css']
})
export class NewprojectComponent implements OnInit {
  status: boolean;
  projectid: string;
  title: string;
  note: string;

  constructor(
      private projectService: ProjectService, private route: ActivatedRoute,
      private router: Router) {}

  ngOnInit() {}

  CreateProject() {
    let promise = this.projectService.CreateProject(this.title, this.note);
    promise.then(status => {
      this.status = status;
      if (this.status) {
        window.location.reload();
        this.title = "";
        this.note = "";
      } else {
        alert('Fail to create the project');
      }
    });
  }

  Cancel() {
    this.router.navigate(['/projects']);
  }
}
