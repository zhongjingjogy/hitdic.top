import { Component, OnInit } from '@angular/core';
import { HitdicserviceService } from '../hitdicservice.service';
import { Project } from '../project';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of, empty } from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
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

  projectid: string;
  tasks: any;
  selection = new SelectionModel(true, []);
  constructor(private hitdicservice: HitdicserviceService, private route: ActivatedRoute,
    private router: Router) { }

  displayedColumns: string[] = ['select', 'tid', 'hid', 'type', 'status', 'createdat'];
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('hid'))
      )
    ).subscribe((d) => {
      this.projectid = d;
      console.log(this.projectid);
      this.hitdicservice.getProjectTasks(this.projectid).subscribe(
        (res) => {
          this.tasks = res["tasks"];
          console.log(this.tasks);
        }
      );
    });
    
  }

  setProjectID(hid: string) {
    this.projectid = hid;
  }

  goProjects() {
    this.router.navigate(['/projects']);
  }

  downloadTask(tid: string) {
    let link = "http://193.112.75.169:8007/" + tid + "/" + tid + ".tar";
    window.open(link, '_blank');
  }

  showTask(tid: string) {
    let link = "http://193.112.75.169:8007/" + tid + "/" + ".report";
    window.open(link, '_blank');
  }

  /*TODO: define class for the task */
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tasks.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.tasks.data.forEach(row => this.selection.select(row));
  }
}
