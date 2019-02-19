import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {empty, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {FileService} from '../file.service';
import {MessageService} from '../message.service';
import {ProjectService} from '../project.service';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
  projectid: string;
  uploaded: boolean;

  constructor(
      private messageService: MessageService, private fileService: FileService,
      private projectService: ProjectService, private route: ActivatedRoute,
      private router: Router) {}

  ngOnInit() {
    this.route.paramMap
        .pipe(switchMap((params: ParamMap) => of(params.get('projectid'))))
        .subscribe((d) => {
          this.projectid = d;
        });
    this.projectService.IsReadyProjectFile(this.projectid)
        .then(status => this.uploaded = status);
  }

  uploadFileOnChange(files: FileList) {
    this.fileService.setFile(files);
  }

  Upload() {
    
    let promise = this.fileService.Upload(this.projectid);
    promise.then(status => {
      if (status == true) {
      }
    })
  }
}
