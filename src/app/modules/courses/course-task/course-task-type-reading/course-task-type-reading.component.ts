import { Component } from '@angular/core';
import { ConfigService } from 'src/app/config/config.service';

import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

@Component({
  selector: 'app-course-task-type-reading',
  templateUrl: './course-task-type-reading.component.html',
  styleUrls: ['./course-task-type-reading.component.css'],
})
export class CourseTaskTypeReadingComponent {
  ImgBaseURL: string = this.config.ImgBaseURL;

  courseId: any;
  taskId: any;
  taskDetails: any;

  constructor(
    private courseTaskService: CourseTaskService,
    private config: ConfigService
  ) {}

  ngOnInit(): void {
    this.courseId = this.courseTaskService.getCourseId();

    this.courseTaskService.getTaskId().subscribe((data: any) => {
      this.taskId = data;
    });

    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
    });
  }
}
