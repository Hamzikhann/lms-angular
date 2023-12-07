import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

@Component({
  selector: 'app-course-task',
  templateUrl: './course-task.component.html',
  styleUrls: ['./course-task.component.css'],
})
export class CourseTaskComponent {
  loading: boolean = false;

  permission: any = {
    assessment: {
      create: false,
      update: false,
      delete: false,
      submit: true,
    },
    videoTranscript: {
      update: false,
    },
    question: {
      create: false,
      update: false,
      delete: false,
      view: { answer: false },
    },
  };

  syllabus: any = {
    id: '',
    title: '',
  };

  taskDetails: any;
  modules: any = [];

  enrollmentId: string = '';

  taskId: any;

  courseId: any;

  taskIdPrevious: any;
  taskIdNext: any;

  courseDetails: any;

  loggedInUser: any;

  constructor(
    private authService: AuthService,
    private apiServices: ApiService,
    private courseTaskService: CourseTaskService,
    private route: ActivatedRoute,
    private config: ConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    if (this.loggedInUser.role.title == 'Administrator') {
      this.permission = {
        assessment: { create: true, update: true, delete: true, submit: false },
        question: {
          create: true,
          update: true,
          delete: true,
          view: { answer: true },
        },
        videoTranscript: {
          update: true,
        },
      };
    }

    this.route.parent?.params.subscribe((params: any) => {
      this.courseId = params.id;
      this.getCourseDetails();
    });

    this.courseTaskService.getModules().subscribe((data: any) => {
      this.modules = data;
    });

    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
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
      this.courseTaskService.setEnrollment(this.enrollmentId);
      this.courseTaskService.callModulesAPI();

      this.route.paramMap.subscribe((data: any) => {
        this.taskId = data.params.taskId;

        this.courseTaskService.setTaskId(this.taskId);
        this.courseTaskService.callTaskDetailsAPI();
        this.courseTaskService.callAssessmentAPI();
      });
    });
  }
}
