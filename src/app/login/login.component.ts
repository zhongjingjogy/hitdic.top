import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
      private userService: UserService, private route: ActivatedRoute,
      private router: Router) {}

  ngOnInit() {}

  Login() {
    if (this.username && this.password) {
      let promise = this.userService.Login(this.username, this.password);
      promise.then((res) => {this.Redirect(res)});
    }
  }

  Redirect(status: boolean) {
    console.log("Calling redirect!");
    if (status == true) {
      this.router.navigate(['/projects']);
    } else {
      window.location.reload();
    }
  }
  Register() {
    this.router.navigate(['/register']);
  }
}
