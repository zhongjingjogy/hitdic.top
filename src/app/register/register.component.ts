import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HitdicserviceService } from '../hitdicservice.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  note: string;
  constructor(private hitdicservice: HitdicserviceService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  Register() {
    if(this.email && this.note) {
      this.hitdicservice.register(this.email, this.note);
    } else {
      alert("Empty information, please fill in it.");
    }
  }
}
