import { Component } from '@angular/core';

import { ApiService } from 'src/app/services/users/api.service';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-course-task-mark-complete',
  templateUrl: './course-task-mark-complete.component.html',
  styleUrls: ['./course-task-mark-complete.component.css'],
})
export class CourseTaskMarkCompleteComponent {
  loggedInUser: any;
  courseId: any;
  courseDetails: any;
  courseSyllabus: any;
  enrollmentId: any;
  taskId: any;
  taskIdNext: any;
  taskDetails: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiServices: ApiService,
    private courseTaskService: CourseTaskService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());

    this.courseTaskService.getEnrollmentId().subscribe((data: any) => {
      this.enrollmentId = data;
    });

    this.courseTaskService.getCourseId().subscribe((data: any) => {
      this.courseId = data;
    });

    this.courseTaskService.getCourseDetails().subscribe((data: any) => {
      this.courseDetails = data;
      if (this.courseDetails) {
        this.courseSyllabus = {
          id: this.courseDetails.courseSyllabus?.id,
          title: this.courseDetails.courseSyllabus?.title,
        };
      }
    });

    this.courseTaskService.getTaskId().subscribe((data: any) => {
      this.taskId = data;
    });

    this.courseTaskService.getTaskIdNext().subscribe((data: any) => {
      this.taskIdNext = data;
    });

    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
    });
  }

  updateTaskProgress() {
    const data = {
      path: 'course/tasks/progress',
      payload: {
        currentTime: '',
        percentage: '100',
        courseId: this.courseId,
        courseTaskId: this.taskId,
        courseEnrollmentId: this.enrollmentId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.reloadCourseModules();
      if (this.taskDetails.courseTaskType.title == 'Assessment') {
        this.courseTaskService.callTaskDetailsAPI(
          this.taskId,
          this.courseId,
          this.enrollmentId
        );
      } else {
        this.goToNextTask();
      }
      this.courseTaskService.callEnrollmentAPI(this.enrollmentId);
    });
  }

  reloadCourseModules() {
    this.courseTaskService.callModulesAPI(
      this.courseSyllabus.id,
      this.enrollmentId
    );
  }

  goToNextTask() {
    const userRole = this.loggedInUser.role.title;
    if (this.taskIdNext) {
      this.router.navigate([
        '/courses',
        userRole == 'User' ? this.enrollmentId : this.courseId,
        'task',
        this.taskIdNext,
      ]);
    } else {
      this.router.navigate([
        '/courses',
        userRole == 'User' ? this.enrollmentId : this.courseId,
        ,
        'achievements',
      ]);
    }
  }
}
