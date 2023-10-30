import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedInUser: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  closeSidebar() {
    $('body').removeClass('has-drawer-opened');
  }
}
