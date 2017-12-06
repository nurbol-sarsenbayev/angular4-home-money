import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'hm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.min(5)]),
      rePassword: new FormControl('', [Validators.required, this.confirmPassword.bind(this)]),
      name: new FormControl('', [Validators.required]),
      accept: new FormControl('', [Validators.required])      
    });
  }

  confirmPassword(control: FormControl) {
  //   console.log('this', this);
  //  if(control.value !== this.form.value['password']) {
  //    return { notEquivalent: true };
  //  }
   return null;
  }

  submitForm(form: NgForm) {
    console.log(form);
  }

}
