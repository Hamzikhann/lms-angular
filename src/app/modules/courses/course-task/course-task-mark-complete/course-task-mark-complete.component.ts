import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';
@Component({
  selector: 'app-course-task-mark-complete',
  templateUrl: './course-task-mark-complete.component.html',
  styleUrls: ['./course-task-mark-complete.component.css'],
})
export class CourseTaskMarkCompleteComponent {
  courseId: any;
  taskId: any;
  taskIdPrevious: any;
  taskIdNext: any;
  taskDetails: any;
  enrollmentId: string = '';
  modules: any;

  constructor(
    private apiServices: ApiService,
    private courseTaskService: CourseTaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = this.courseTaskService.getCourseId();
    this.enrollmentId = this.courseTaskService.getEnrollmentId();
    this.taskId = this.courseTaskService.getTaskId();
    this.taskIdNext = this.courseTaskService.getTaskIdNext();

    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
    });
    this.courseTaskService.getModules().subscribe((data: any) => {
      this.modules = data;
    });
  }

  updateTaskProgress(percentage: any) {
    const data = {
      path: 'course/tasks/progress',
      payload: {
        currentTime: '',
        percentage: percentage.toString(),
        courseId: this.courseId,
        courseTaskId: this.taskId,
        courseEnrollmentId: this.enrollmentId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.taskDetails.courseTaskType.title == 'Assessment') {
        this.courseTaskService.callTaskDetailsAPI();
      } else {
        this.goToNextTask();
      }
      this.courseTaskService.callModulesAPI();
    });
  }

  goToNextTask() {
    if (this.taskIdNext) {
      this.router.navigate([
        '/courses',
        this.courseId,
        'task',
        this.taskIdNext,
      ]);
    } else {
      this.router.navigate(['/courses', this.courseId, 'achievements']);
    }
  }
}
