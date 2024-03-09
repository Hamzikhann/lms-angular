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

  sections: any = {
    dashboard: false,
    courses: false,
    clients: false,
    learningPaths: false,
    users: false,
    assignments: false,
    teams: false,
    enrollments: false,
    changePassword: false,
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private config: ConfigService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    this.loggedInUserRole = this.loggedInUser.role.title;
    this.client = this.loggedInUser.client;

    if (this.router.url.includes('dashboard')) {
      this.sections.dashboard = true;
    } else if (this.router.url.includes('courses')) {
      this.sections.courses = true;
    } else if (this.router.url.includes('clients')) {
      this.sections.clients = true;
    } else if (this.router.url.includes('learningPaths')) {
      this.sections.learningPaths = true;
    } else if (this.router.url.includes('users')) {
      this.sections.users = true;
    } else if (this.router.url.includes('teams')) {
      this.sections.teams = true;
    } else if (this.router.url.includes('enrollments')) {
      this.sections.enrollments = true;
    } else {
      this.sections.changePassword = true;
    }
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/signin']);
  }

  toggleSection(name: string) {
    this.sections = {
      dashboard: false,
      courses: false,
      clients: false,
      learningPaths: false,
      users: false,
      assignments: false,
      teams: false,
      enrollments: false,
      changePassword: false,
    };
    this.sections[name] = true;
  }
}
