import { Component } from '@angular/core';

import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

@Component({
  selector: 'app-course-task-description',
  templateUrl: './course-task-description.component.html',
  styleUrls: ['./course-task-description.component.css'],
})
export class CourseTaskDescriptionComponent {
  taskDetails: any;

  constructor(private courseTaskService: CourseTaskService) {}

  ngOnInit(): void {
    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
    });
  }
}
