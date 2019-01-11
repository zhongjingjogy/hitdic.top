import { Component, OnInit } from '@angular/core';
import { HitdicserviceService } from '../hitdicservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: "*********";
  constructor(private hitdicservice: HitdicserviceService) { }

  ngOnInit() {
  }

  Login() {
    if(this.token) {
      this.hitdicservice.setToken(this.token);
    }
  }

}
