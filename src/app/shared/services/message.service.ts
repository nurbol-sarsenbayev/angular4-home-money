import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';

@Injectable()
export class MessageService {

  messages: Message[] = [];

  constructor() { }

  addMessage(text: string, type: string = 'warning') {
    this.messages.push(new Message(text, type));
  }

  addError(text: string) {
    this.addMessage(text, 'danger');
  }

  addSuccess(text: string) {
    this.addMessage(text, 'success');
  }

  removeMessage(message: Message) {
    if(this.messages) {
      for(let i = 0; i < this.messages.length; i++) {
        let m = this.messages[i];
        if(m == message) {
          this.messages.splice(i, 1);
          break;
        }
      }
    }
  }

}
