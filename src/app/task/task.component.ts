import { Component, OnInit } from '@angular/core';
import { HitdicserviceService } from '../hitdicservice.service';
import { Project } from '../project';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of, empty } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  projectid: string;
  tasks: any;
  constructor(private hitdicservice: HitdicserviceService, private route: ActivatedRoute,
    private router: Router) { }

  displayedColumns: string[] = ['tid', 'hid', 'type', 'status', 'createdat'];
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

}
