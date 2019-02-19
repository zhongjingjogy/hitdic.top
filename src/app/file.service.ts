import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {URL_isreadyprojectfile, URL_uploadprojectfile} from './urls';

@Injectable({providedIn: 'root'})
export class FileService {
  message: string;
  files: FileList;
  file: File;
  formData: FormData
  status: boolean;
  constructor(
      private messageService: MessageService, private http: HttpClient,
      private router: Router) {}

  setFile(files: FileList) {
    this.files = files;
    this.file = null;
    this.file = this.files[0];
    this.files = null;
  }

  Upload(projectId: string) {
    if (!(this.file && projectId)) {
      this.messageService.set('Select a file');
      return new Promise<boolean>((resolve, reject) => {resolve(false);});
    }

    this.formData = new FormData();
    this.formData.append('projectid', projectId);
    this.formData.append('file', this.file);

    const httpOptions = {
    };

    let promise = new Promise<boolean>((resolve, reject) => {
      this.http.post(URL_uploadprojectfile, this.formData, httpOptions)
          .toPromise()
          .then((response) => {
            this.status = response['status'];
            if (this.status == true) {
              this.messageService.set(
                  'Successfully upload the project file for : ' + projectId);
                resolve(true);
            } else {
              this.messageService.set(response['msg']);
              resolve(false);
            }
          });
    });

    // this.http.post(URL_uploadprojectfile, this.formData, httpOptions)
    //     .subscribe((response) => {
    //       this.status = response['status'];
    //       if (this.status == true) {
    //         return true;
    //       } else {
    //         this.messageService.set(response['msg']);
    //         return false;
    //       }
    //     });

    return promise;
  }

  private Redirect(redirect: boolean, redirectUrl: string) {
    if (redirect == true) {
      this.router.navigate(['/' + redirectUrl]);
    }
  }
}
