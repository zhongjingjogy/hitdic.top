import { Component, OnInit } from '@angular/core';
import { HitdicserviceService } from '../hitdicservice.service';
import { Project } from '../project';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of, empty } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  nodenumber: number;
  projectid: string;

  constructor(private hitdicservice: HitdicserviceService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap
    .pipe(switchMap((params: ParamMap) => of(params.get('hid'))))
    .subscribe((d) => {
      this.projectid = d;
      console.log(this.projectid);
    });
  }

  setProjectID(hid: string) {
    this.projectid = hid;
  }

  goProjects() {
    this.router.navigate(['/projects']);
  }

  Create() {
    // TODO: collect infomation from form and post it to the server
  }
}
