import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {empty, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {HitdicserviceService} from '../hitdicservice.service';
import {Project} from '../project';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  projectid: string;
  project: any;
  constructor(
      private hitdicservice: HitdicserviceService,
      private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap
        .pipe(switchMap((params: ParamMap) => of(params.get('hid'))))
        .subscribe((d) => {
          this.projectid = d;
          this.hitdicservice.getProject(this.projectid)
              .subscribe((response) => {
                console.log(response);
                if (response['status'] == 'OK') {
                  this.project = response['project'];
                  console.log('Token is valid!');
                } else {
                  alert(response['status']);
                }
              })
        });
  }

  setProjectID(hid: string) {
    this.projectid = hid;
  }

  goProjects() {
    this.router.navigate(['/projects']);
  }
}
