import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of, empty } from 'rxjs';
import { HitdicserviceService } from '../hitdicservice.service';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css']
})
export class NewprojectComponent implements OnInit {

  projectid: string;
  title: string;
  note: string;
  constructor(private hitdicservice: HitdicserviceService, private route: ActivatedRoute,
    private router: Router) {

   }

  ngOnInit() {
  }

  createProject() {
    // TODO: 
    alert("TODO: post a message to server, and get the id of project using this function.");
  }

  Cancel() {
    this.router.navigate(['/projects']);
  }
}
