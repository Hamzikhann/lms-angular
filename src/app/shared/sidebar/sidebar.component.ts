import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  client: any;
  loggedInUser: any;
  loggedInUserRole: any;
  imageBaseUrl: string = this.config.ImgBaseURL;

  constructor(
    private router: Router,
    private authService: AuthService,
    private config: ConfigService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    this.loggedInUserRole = this.loggedInUser.role.title;
    this.client = this.loggedInUser.client;
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/signin']);
  }
}
