import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiService } from 'src/app/services/users/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  courses: any;
  loggedInUser: any;
  loggedInUserRole: string = '';
  courseStats: any;

  constructor(
    private authService: AuthService,
    private apiServices: ApiService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    this.loggedInUserRole = this.loggedInUser.role.title;
    if (this.loggedInUserRole == 'User') this.getCourseStatistics();
    this.getCourses();
  }

  getCourses() {
    const data = {
      path: 'courses/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.courses = response;
    });
  }

  getCourseStatistics() {
    const data = {
      path: 'dashboard',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.courseStats = response.data;
      console.log(this.courseStats);
    });
  }
}
