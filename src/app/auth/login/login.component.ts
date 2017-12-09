import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'hm-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  isAuthFailed: boolean = false;

  constructor(private service: UsersService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    if(form.valid) {
      this.service.getUser(form.value['email'], form.value['password'])
          .subscribe(user => {
            this.isAuthFailed = !user;
          });
    }
  }

}
