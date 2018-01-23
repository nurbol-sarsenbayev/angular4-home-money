import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'hm-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SystemComponent implements OnInit {

  currentUser: User;
  currentDate = new Date();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }

}
