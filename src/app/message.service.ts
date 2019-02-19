import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: string = null;
  constructor() { }

  set(message: string) {
    this.message = message;
  }

  clear() {
    this.message = null;
  }
}
