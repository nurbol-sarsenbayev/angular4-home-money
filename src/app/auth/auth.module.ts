import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [
    AuthComponent, 
    LoginComponent, 
    RegistrationComponent
  ]
})
export class AuthModule { }
