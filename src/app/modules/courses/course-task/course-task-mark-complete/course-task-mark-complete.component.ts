import { Component } from '@angular/core';

import { ApiService } from 'src/app/services/users/api.service';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-task-mark-complete',
  templateUrl: './course-task-mark-complete.component.html',
  styleUrls: ['./course-task-mark-complete.component.css'],
})
export class CourseTaskMarkCompleteComponent {
  courseId: any;
  enrollmentId: string = '';
  taskId: any;
  taskIdNext: any;
  taskDetails: any;

  constructor(
    private router: Router,
    private apiServices: ApiService,
    private courseTaskService: CourseTaskService
  ) {}

  ngOnInit(): void {
    this.courseId = this.courseTaskService.getCourseId();
    this.enrollmentId = this.courseTaskService.getEnrollmentId();

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
      this.courseTaskService.callModulesAPI();
      if (this.taskDetails.courseTaskType.title == 'Assessment') {
        this.courseTaskService.callTaskDetailsAPI(this.taskId);
      } else {
        this.goToNextTask();
      }
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
