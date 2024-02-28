import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Editor, Toolbar } from 'ngx-editor';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

@Component({
  selector: 'app-course-task-navigation',
  templateUrl: './course-task-navigation.component.html',
  styleUrls: ['./course-task-navigation.component.css'],
})
export class CourseTaskNavigationComponent {
  courseId: any;
  taskIdPrevious: any;
  taskIdNext: any;
  taskDetails: any;
  loggedInUser: any;

  constructor(
    private courseTaskService: CourseTaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());

    this.courseId = this.courseTaskService.getCourseId();

    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
    });

    this.courseTaskService.getTaskIdPrevious().subscribe((data: any) => {
      this.taskIdPrevious = data;
    });

    this.courseTaskService.getTaskIdNext().subscribe((data: any) => {
      this.taskIdNext = data;
    });
  }
}
