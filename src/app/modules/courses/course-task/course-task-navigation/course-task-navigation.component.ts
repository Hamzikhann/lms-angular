import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Editor, Toolbar } from 'ngx-editor';

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

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private apiServices: ApiService,
    private route: ActivatedRoute,
    private config: ConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());

    this.route.parent?.params.subscribe((params: any) => {
      this.courseId = params.id;
    });

    this.getTaskDetails();
  }

  getTaskDetails() {
    this.loading = true;

    var data: any = {
      path: 'course/tasks/detail',
      payload: {
        courseTaskId: this.taskId,
      },
    };
    if (this.loggedInUser.role.title == 'User') {
      data.payload.courseId = this.courseId;
      data.payload.courseEnrollmentId = this.enrollmentId;
    }
    this.apiServices.postRequest(data).subscribe((response) => {
      this.taskDetails = response.data;
      console.log(this.taskDetails);
      if (this.taskDetails?.courseTaskProgresses.length > 0) {
        this.taskDetails.progress =
          this.taskDetails?.courseTaskProgresses[0].percentage;
        // this.submitted = true;
      } else {
        this.taskDetails.progress = '0';
      }
      this.loading = false;
    });
  }
}
