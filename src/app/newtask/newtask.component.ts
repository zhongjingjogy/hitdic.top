import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {empty, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {HitdicserviceService} from '../hitdicservice.service';
import {Project} from '../project';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {

  title: string;
  note: string;
  nodenumber: number;
  types = [
    {value: 'mcmc', viewValue: 'MCMC'},
    {value: 'varselaic', viewValue: 'VarSelAIC'},
    {value: 'varsell2norm', viewValue: 'VarSelL2NORM'}
  ];

  constructor(
      private hitdicservice: HitdicserviceService,
      private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  createTask() {
    // TODO: collect infomation from form and post it to the server
  }
}
