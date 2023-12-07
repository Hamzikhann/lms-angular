import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/users/api.service';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-course-task-attributes',
  templateUrl: './course-task-attributes.component.html',
  styleUrls: ['./course-task-attributes.component.css'],
})
export class CourseTaskAttributesComponent {
  loggedInUser: any;

  courseId: any;
  taskId: any;
  taskDetails: any;
  enrollmentId: string = '';

  constructor(
    private authService: AuthService,
    private courseTaskService: CourseTaskService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
    });
  }
}
