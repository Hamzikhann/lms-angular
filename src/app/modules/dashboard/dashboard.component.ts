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

  constructor(
    private authService: AuthService,
    private apiServices: ApiService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    if (this.loggedInUser.role.title == 'Administrator') {
      this.getCourses();
    } else if (this.loggedInUser.role.title == 'Client') {
      this.getAssignedCourses();
    } else if (this.loggedInUser.role.title == 'User') {
      this.getCourses();
    }
  }

  getCourses() {
    const data = {
      path: 'courses/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.courses = data;
      console.log(this.courses);
    });
  }

  getAssignedCourses() {
    const data = {
      path: 'courses/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.courses = data;
    });
  }
}
