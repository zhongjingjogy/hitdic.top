import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of, empty } from 'rxjs';
import { HitdicserviceService } from '../hitdicservice.service';

import { FileUploader } from 'ng2-file-upload';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.css']
})

export class EditprojectComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  projectid: string;
  
  constructor(private hitdicservice: HitdicserviceService, private route: ActivatedRoute,
    private router: Router) {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('hid'))
      )
    ).subscribe((d) => {
      this.projectid = d;
      console.log(this.projectid);
    });
   }

  ngOnInit() {
  }

}
