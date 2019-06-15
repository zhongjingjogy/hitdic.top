import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';

import {MessageService} from './message.service';
import {URL_changeusepermission, URL_gettoken, URL_getuserlist, URL_hasusepermission, URL_register} from './urls';
import {User} from './user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({providedIn: 'root'})
export class UserService {
  user: User = new User();
  status: boolean;

  constructor(
      private http: HttpClient, private messageService: MessageService,
      private router: Router) {}

  SaveSession(username: string, token: string, use: boolean) {
    localStorage.setItem(
        'currentUser',
        JSON.stringify({token: token, username: username, use: use}));
  }

  ClearSession() {
    localStorage.setItem('currentUser', '');
  }

  LoadSession() {
    console.log('Loading session...')
    try {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } catch {
      return new Promise<boolean>((resolve, reject) => {resolve(false)});
    }

    let promise = new Promise<boolean>((resolve, reject) => {
      if (currentUser) {
        try {
          this.user.token = currentUser.token;  // your token
          this.user.username = currentUser.username;
          this.user.use = currentUser.use;
          this.status = true;
          console.log('use permission in load session: ', this.user.use);
          console.log("token in load session: " + this.user.token);
          resolve(true);
        } catch {
          resolve(false);
        }

      } else {
        resolve(false);
      }
    });
    return promise;
  }

  CheckUsePermission(username: string, token: string) {
    this.http
        .post(
            URL_hasusepermission, {username: username, token: token},
            httpOptions)
        .subscribe((response) => {
          this.status = response['status'];
          console.log('user is get in login');
          if (this.status == false) {
            this.messageService.set(response['msg']);
          } else {
            this.user.use = response['use'];
            this.SaveSession(
                this.user.username, this.user.token, this.user.use);
          }
        });
  }

  Logout() {
    this.ClearSession();
    window.location.reload();
  }

  Login(username: string, password: string) {
    if (!(username && password)) {
      this.messageService.set('Invalid login information');
      return;
    }
    this.user.username = username;
    this.user.use = false;

    let promise = new Promise<boolean>((resolve, reject) => {
      this.http
          .post(
              URL_gettoken, {username: username, password: password},
              httpOptions)
          .toPromise()
          .then((response) => {
            this.status = response['status'];
            if (this.status == false) {
              this.messageService.set(response['msg']);
            } else {
              this.user.token = response['token'];
              console.log(this.user.token);
              this.CheckUsePermission(this.user.username, this.user.token);
            }
            this.SaveSession(
                this.user.username, this.user.token, this.user.use);
            resolve(this.status);
          });
    });

    return promise;
  }

  Register(
      username: string, password: string, confirmPassword: string,
      email: string) {
    if (!(username && password && confirmPassword && email)) {
      this.messageService.set('Invalid register information');
      return;
    }
    if (password != confirmPassword) {
      this.messageService.set('Unable to confirm the password');
      return;
    }

    this.user.username = username;

    this.http
        .post(
            URL_register,
            {username: username, password: password, email: email}, httpOptions)
        .subscribe((response) => {
          this.status = response['status'];
          if (this.status == false) {
            this.messageService.set(response['msg']);
          } else {
            this.router.navigate(['/login']);
          }
        });
  }

  UserList(username: string, token: string) {
    if (!(username && token)) {
      this.messageService.set('Invalid login information');
      return;
    }

    let promise = new Promise<User[]>((resolve, reject) => {
      this.http
          .post(URL_getuserlist, {root: username, token: token}, httpOptions)
          .toPromise()
          .then((response) => {
            this.status = response['status'];
            if (this.status == false) {
              this.messageService.set(response['msg']);
            } else {
              this.user.token = response['token'];
            }
            console.log(response['users']);
            resolve(response['users']);
          });
    });

    return promise;
  }

  ChangeUsePermission(root: string, token: string, userid: number) {
    // console.log("root user in change use permission: ", root, token);
    let promise = new Promise<User[]>((resolve, reject) => {
      this.http
          .post(
              URL_changeusepermission,
              {root: root, token: token, id: userid}, httpOptions)
          .subscribe((response) => {
            this.status = response['status'];
            if (this.status == false) {
              this.messageService.set(response['msg']);
            }
            console.log(response);
          });
    });
    return promise;
  }
}
