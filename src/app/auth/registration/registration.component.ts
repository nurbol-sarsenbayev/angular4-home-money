import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hm-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  email: FormControl;
  password: FormControl;
  rePassword: FormControl;
  name: FormControl;
  agree: FormControl;

  constructor(private service: UsersService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      "user": new FormGroup({
        "email": new FormControl('', [Validators.required, Validators.email], this.existEmail.bind(this)),
        "password": new FormControl('', [Validators.required, Validators.minLength(6), this.checkPassword]),
        "name": new FormControl('', [Validators.required])  
      }),
      "rePassword": new FormControl('', [Validators.required, this.confirmPassword.bind(this)]),
      "agree": new FormControl(false, [Validators.requiredTrue])      
    });    

    this.email = <FormControl>this.form.get('user.email');
    this.password = <FormControl>this.form.get('user.password');
    this.rePassword = <FormControl>this.form.get('rePassword');
    this.name = <FormControl>this.form.get('user.name');
    this.agree = <FormControl>this.form.get('agree');  
  }

  checkPassword(control: FormControl) {
    let reg = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{4,}/g;
    if(!control.value.match(reg)) {
      return { notReliable: true };
    }
    return null;
   }

  confirmPassword(control: FormControl) {
    if(this.password && control.value !== this.password.value) {
      return { notEquivalent: true };
    }
    return null;
  }

  existEmail(control: FormControl) {
    return this.service.isEmailExist(control.value)
      .map(isExist => { 
        return isExist ? { emailExist: isExist } : null; 
      });
  }

  register() {
    if(this.form.valid) {
      let newUser = this.form.value['user'];
      this.service.addUser(newUser)
        .subscribe(user => {
          if(user) {
            this.router.navigate(['/login']);
          }
        });
    }
  }

}
