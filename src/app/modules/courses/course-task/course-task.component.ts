import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/users/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

@Component({
  selector: 'app-course-task',
  templateUrl: './course-task.component.html',
  styleUrls: ['./course-task.component.css'],
})
export class CourseTaskComponent {
  loading: boolean = false;

  courseId: any;
  courseDetails: any;
  syllabus: any = {
    id: '',
    title: '',
  };
  modules: any = [];
  enrollmentId: string = '';
  taskId: any;
  taskIdPrevious: any;
  taskIdNext: any;
  taskDetails: any;
  loggedInUser: any;

  constructor(
    private authService: AuthService,
    private apiServices: ApiService,
    private courseTaskService: CourseTaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    this.route.parent?.params.subscribe((params: any) => {
      this.courseId = params.id;
      this.getCourseDetails();
    });

    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
    });

    this.courseTaskService.getModules().subscribe((data: any) => {
      this.modules = data;
    });
  }

  getCourseDetails() {
    const data = {
      path: 'courses/detail',
      payload: {
        courseId: this.courseId,
      },
    };

    this.apiServices.postRequest(data).subscribe((response) => {
      this.courseDetails = response;
      this.courseTaskService.setCourse(this.courseId, this.courseDetails);

      this.syllabus = {
        id: this.courseDetails.courseSyllabus?.id,
        title: this.courseDetails.courseSyllabus?.title,
      };
      this.getEnrollmentDetails();
    });
  }

  getEnrollmentDetails() {
    const data = {
      path: 'course/tasks/enrollment',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.enrollmentId = response.data?.id;
      this.courseTaskService.setEnrollmentId(this.enrollmentId);
      this.courseTaskService.callModulesAPI();

      this.route.paramMap.subscribe((data: any) => {
        this.taskId = data.params.taskId;
        this.courseTaskService.setTaskId(this.taskId);
        this.courseTaskService.callTaskDetailsAPI(this.taskId);
        this.courseTaskService.callAssessmentAPI(this.taskId);
      });
    });
  }
}
