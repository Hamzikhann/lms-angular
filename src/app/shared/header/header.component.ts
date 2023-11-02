import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/config/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedInUser: any;
  client: any;
  imageBaseUrl: string = this.config.ImgBaseURL;

  constructor(
    private router: Router,
    private authService: AuthService,
    private config: ConfigService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    this.client = this.loggedInUser.client;
    // console.log(this.client);
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/signin']);
  }

  closeSidebar() {
    $('body').removeClass('has-drawer-opened');
  }
}
