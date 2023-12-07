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
  taskId: any;
  taskIdPrevious: any;
  taskIdNext: any;
  taskDetails: any;

  enrollmentId: string = '';

  loading: boolean = false;
  loggedInUser: any;
  courseDetails: any;

  syllabus: any = {
    id: '',
    title: '',
  };

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private courseTaskService: CourseTaskService,

    private apiServices: ApiService,
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

    this.taskIdPrevious = this.courseTaskService.getTaskIdPrevious();
    this.taskIdNext = this.courseTaskService.getTaskIdNext();

    console.log(this.taskIdPrevious, this.taskIdNext);
  }
}
