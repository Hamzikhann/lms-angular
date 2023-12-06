import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';

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
      this.getModules();

      this.route.paramMap.subscribe((data: any) => {
        this.taskId = data.params.taskId;
        this.getTaskDetails();
      });
    });
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

  getModules() {
    var data: any = {
      path: 'course/modules/list',
      payload: {
        courseSyllabusId: this.syllabus.id,
      },
    };
    if (this.loggedInUser.role.title == 'User') {
      data.payload.courseEnrollmentId = this.enrollmentId;
    }
    this.apiServices.postRequest(data).subscribe((response) => {
      this.modules = response.data;

      const tasks: any = [];
      this.modules.forEach((module: any) => {
        module.courseTasks.forEach((task: any, key: any) => {
          task.progress =
            task.courseTaskProgresses?.length > 0
              ? task.courseTaskProgresses[0].percentage
              : '0';
          tasks.push(task);
        });
      });

      var taskTodo: any = tasks.length ? tasks[0] : null;

      tasks.forEach((task: any, key: any) => {
        task.index = key;

        if (task.id == this.taskId) {
          this.taskIdPrevious = tasks[key - 1] ? tasks[key - 1].id : 0;
          this.taskIdNext = tasks[key + 1] ? tasks[key + 1].id : 0;
        }

        if (task.progress != '0') {
          taskTodo = tasks[key + 1] ? tasks[key + 1] : null;
        }
      });

      if (this.loggedInUser.role.title == 'User' && taskTodo) {
        for (let index = taskTodo.index + 1; index < tasks.length; index++) {
          if (tasks[index]) {
            tasks[index].disabled = true;
          }
        }
      }
    });
  }
}
