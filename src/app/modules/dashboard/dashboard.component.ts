import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  courseEnrollmentId: any;

  constructor(
    private router: Router,
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
    });
  }

  resumeCourse(courseId: any, id: string) {
    const data = {
      path: 'course/tasks/due',
      payload: {
        courseEnrollmentId: id,
      },
    };
    this.apiServices.postRequest(data).subscribe((response: any) => {
      const taskId = response.data?.courseTask?.id;
      if (taskId) {
        this.router.navigate(['/courses', courseId, 'task', taskId]);
      }
    });
  }
}
