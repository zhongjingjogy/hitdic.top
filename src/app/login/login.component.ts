import { Component, OnInit } from '@angular/core';
import { HitdicserviceService } from '../hitdicservice.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: "*********";
  constructor(private hitdicservice: HitdicserviceService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  Login() {
    if(this.token) {
      this.hitdicservice.setToken(this.token);
    }
  }

  Register() {
    this.router.navigate(['/register']);
  }

}
