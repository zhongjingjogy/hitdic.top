import { Component, OnInit } from '@angular/core';
import { HitdicserviceService } from '../hitdicservice.service';
import { Project } from '../project';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[];
  constructor(private hitdicservice: HitdicserviceService, private route: ActivatedRoute,
    private router: Router) {
    
   }

  ngOnInit() {
    if (!this.hitdicservice.status) {
      this.router.navigate(['/login']);
    }
    this.projects = this.hitdicservice.projects;
    console.log(this.projects);
  }

  listTasks(hid: string) {
    this.router.navigate(['/project/' + hid]);
  }

}
