import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message.model';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'hm-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messages = this.messageService.messages;
  }  

  removeMessage(m: Message) {
    this.messageService.removeMessage(m);
  }

}
