import { Component, OnInit } from '@angular/core';

import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];
  root: string;
  token: string;
  displayedColumns: string[] =['id', 'username', 'token', 'use'];

  constructor(public userService: UserService) { }

  ngOnInit() {
    console.log("current user: ", this.userService.user.username, this.userService.user.token);
    this.root = this.userService.user.username;
    this.token = this.userService.user.token;
    let promise = this.userService.UserList(this.userService.user.username, this.userService.user.token);
    promise.then(users => {
      this.users = users;
    })
  }

  ChangeUsePermission(userid: number) {
    // console.log("root user: ", this.root, this.token);
    // console.log(this.userService.user.username);
    // console.log(this.userService.user.token);
    let promise = this.userService.ChangeUsePermission(this.root, this.token, userid);
    promise.then(status => {

    });
    console.log(userid);
  }

}
