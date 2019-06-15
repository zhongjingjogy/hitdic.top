import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {UserService} from '../user.service';

@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit {
  constructor(
      public userService: UserService, private route: ActivatedRoute,
      private router: Router) {}

  ngOnInit() {
    if (!this.userService.status == true) {
      let promise = this.userService.LoadSession();
      promise.then(status => {
        if (status == true) {
          // window.location.reload();
        } else {
          // this.router.navigate(['/login']);
        }
      })
    } else {
      window.location.reload();
    }
  }
}
