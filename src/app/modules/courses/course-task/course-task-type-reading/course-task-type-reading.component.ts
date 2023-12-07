import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Editor, Toolbar } from 'ngx-editor';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

@Component({
  selector: 'app-course-task-type-reading',
  templateUrl: './course-task-type-reading.component.html',
  styleUrls: ['./course-task-type-reading.component.css'],
})
export class CourseTaskTypeReadingComponent {
  ImgBaseURL: string = this.config.ImgBaseURL;

  loggedInUser: any;

  courseId: any;
  courseDetails: any;
  taskId: any;
  taskIdPrevious: any;
  taskIdNext: any;
  taskDetails: any;
  enrollmentId: string = '';

  syllabus: any = {
    id: '',
    title: '',
  };

  submission: any = [];
  submitted: boolean = false;
  error: boolean = false;

  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private apiServices: ApiService,
    private courseTaskService: CourseTaskService,

    private route: ActivatedRoute,
    private config: ConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());

    this.courseId = this.courseTaskService.getCourseId();
    this.taskId = this.courseTaskService.getTaskId();

    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
    });
  }
}
