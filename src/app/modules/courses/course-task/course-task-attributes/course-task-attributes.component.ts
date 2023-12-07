import { Component } from '@angular/core';

import { CourseTaskService } from 'src/app/services/course-task/course-task.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-course-task-attributes',
  templateUrl: './course-task-attributes.component.html',
  styleUrls: ['./course-task-attributes.component.css'],
})
export class CourseTaskAttributesComponent {
  loggedInUser: any;
  permission: any = {
    task: { progress: false },
  };

  taskDetails: any;

  constructor(
    private courseTaskService: CourseTaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    if (this.loggedInUser.role.title == 'User') {
      this.permission.task.progress = true;
    }

    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
    });
  }
}
