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
  courseSyllabus: any = {
    id: '',
    title: '',
  };
  enrollmentId: string = '';
  modules: any = [];
  taskId: any;
  taskIdPrevious: any;
  taskIdNext: any;
  taskDetails: any;
  loggedInUser: any;

  currentPage: number = 1;
  pageNumber: number = 1;
  totalPages: number = 0;
  reference: any;

  constructor(
    private authService: AuthService,
    private apiServices: ApiService,
    private courseTaskService: CourseTaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());

    this.courseTaskService.getEnrollmentId().subscribe((data: any) => {
      this.enrollmentId = data;
      console.log(this.taskDetails);
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

    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
    });

    this.courseTaskService.getModules().subscribe((data: any) => {
      this.modules = data;
    });

    this.courseTaskService.getLoading().subscribe((data: any) => {
      this.loading = data;
    });

    setTimeout(() => {
      this.route.paramMap.subscribe((data: any) => {
        this.taskId = data.params.taskId;
        this.courseTaskService.setTaskId(this.taskId);
        this.courseTaskService.callTaskDetailsAPI(
          this.taskId,
          this.courseId,
          this.enrollmentId
        );
        this.courseTaskService.callAssessmentAPI(this.taskId);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      });
    }, 500);
  }

  reloadCourseModules() {
    this.courseTaskService.callModulesAPI(
      this.courseSyllabus.id,
      this.enrollmentId
    );
  }

  afterLoadComplete(pdf: any): void {
    this.totalPages = pdf.numPages;
  }

  private getTotalPages(): any {
    return this.totalPages || 0;
  }
}
