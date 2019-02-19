import {Component, OnInit} from '@angular/core';

import {MessageService} from '../message.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;

  constructor(
      private userService: UserService,
      private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.clear();
  }

  Register() {
    this.userService.Register(
        this.username, this.password, this.confirmPassword, this.email);
  }
}
