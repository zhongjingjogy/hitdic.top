import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {empty, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {HitdicserviceService} from '../hitdicservice.service';
import {Project} from '../project';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  projectid: string;
  tasks: any;
  selection = new SelectionModel(true, []);
  constructor(
      private hitdicservice: HitdicserviceService,
      private route: ActivatedRoute, private router: Router) {}

  displayedColumns: string[] =
      ['select', 'tid', 'hid', 'type', 'status', 'createdat'];
  ngOnInit() {
    this.route.paramMap
        .pipe(switchMap((params: ParamMap) => of(params.get('hid'))))
        .subscribe((d) => {
          this.projectid = d;
          console.log(this.projectid);
          this.hitdicservice.getProjectTasks(this.projectid)
              .subscribe((res) => {
                this.tasks = res['tasks'];
                console.log(this.tasks);
              });
        });
  }

  downloadTask(tid: string) {
    let link = 'http://193.112.75.169:8007/' + tid + '/' + tid + '.tar';
    window.open(link, '_blank');
  }

  showTask(tid: string) {
    let link = 'http://193.112.75.169:8007/' + tid + '/' +
        '.report';
    window.open(link, '_blank');
  }

  /*The following function is used for uploading files*/
  /**
   * Whether the number of selected elements matches the total number of rows.
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tasks.data.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection.
   */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.tasks.data.forEach(row => this.selection.select(row));
  }
}
