import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

import { UsersService } from '../../shared/services/users.service';
import { MessageService } from '../../shared/services/message.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hm-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) { 
    title.setTitle("Страница входа");
    meta.updateTag({ name: "keywords", content: "вход, логин" });
    meta.updateTag({ name: "description", content: "Страница входа в систему Домашнюю бухгалтерию" });    
  }

  ngOnInit() {
    
    this.route.queryParams
      .subscribe(params => {
        if(params['canLogin']) {
          this.messageService.addSuccess('Регистрация прошла успешно! Теперь зайдите в систему.')
        }
        if(params['accessDenied']) {
          this.messageService.addMessage('У вас нет доступа.');
        }
      });
  }

  login(form: NgForm) {
    if(form.valid) {
      this.authService.login(form.value['email'], form.value['password'])
          .subscribe(isLogged => {
            if(!isLogged) {
              this.messageService.addError('Email или пароль неверны');
            } else {
              this.router.navigate(['/system']);
            }
          });
    }
  }

}
