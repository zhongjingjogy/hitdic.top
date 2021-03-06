import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { TaskService } from '../task.service';
import { ProjectService } from '../project.service';
import {UserService} from '../user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {empty, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {

  title: string;
  note: string;
  method: string;
  cores: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  corenumber: number = 2;
  projectid: string;
  server: string;

  methods = [
    { value: 'mcmc', viewValue: 'MCMC' },
    { value: 'aic', viewValue: 'AIC' },
    { value: 'l2norm', viewValue: 'L2NORM' },
    { value: 'ga', viewValue: 'GA'},
    { value: 'l1norm', viewValue: 'L1NORM'},
    { value: 'bic', viewValue: 'BIC'}
  ];

  servers = [
    { value: 'zhang', viewValue: 'zhang' },
    { value: 'tang', viewValue: 'tang' },
    { value: 'zhou', viewValue: 'zhou' },
  ];

  constructor(public userService: UserService, private messageService: MessageService, private taskService: TaskService, public projectService: ProjectService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.messageService.clear();
    this.route.paramMap
        .pipe(switchMap((params: ParamMap) => of(params.get('projectid'))))
        .subscribe((d) => {
          this.projectid = d;
        });
  }

  CreateTask() {
    this.taskService.CreateTask(this.projectid, this.title, this.note, this.method, this.corenumber, this.server);
  }
}
