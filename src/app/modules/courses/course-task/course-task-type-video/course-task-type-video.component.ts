import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Editor, Toolbar } from 'ngx-editor';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

@Component({
  selector: 'app-course-task-type-video',
  templateUrl: './course-task-type-video.component.html',
  styleUrls: ['./course-task-type-video.component.css'],
})
export class CourseTaskTypeVideoComponent {
  VideoBaseURL: string = this.config.VideoBaseURL;

  loggedInUser: any;

  courseId: any;
  courseDetails: any;
  taskId: any;
  taskIdPrevious: any;
  taskIdNext: any;
  taskDetails: any;
  enrollmentId: string = '';

  assessments: any = [];
  assessment: any = {
    id: '',
    title: '',
    description: '',
    estimatedTime: '',
    startTime: '',
  };

  question: any = {
    id: '',
    title: '',
    options: '',
    answer: '',
    type: '',
  };

  syllabus: any = {
    id: '',
    title: '',
  };

  submission: any = [];
  submitted: boolean = false;

  passAssessment: boolean = false;

  showError: boolean = false;

  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private apiServices: ApiService,
    private courseTaskService: CourseTaskService,

    private route: ActivatedRoute,
    private config: ConfigService,
    private router: Router
  ) {}
  @ViewChild('videoPlayer') videoPlayer: ElementRef | any;
  @ViewChild('taskAssessmentModal') taskAssessmentModal: ElementRef | undefined;
  @ViewChild('closeVideoAssessmentModal') closeVideoAssessmentModal:
    | ElementRef
    | undefined;

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());

    this.courseId = this.courseTaskService.getCourseId();
    this.courseDetails = this.courseTaskService.getCourseDetails();

    this.taskId = this.courseTaskService.getTaskId();
    this.enrollmentId = this.courseTaskService.getEnrollmentId();

    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
    });
    this.courseTaskService.getAssessments().subscribe((data: any) => {
      this.assessments = data;
    });
  }

  getSubmissions(event: any, questionId: string) {
    var updated = false;
    var value = event.target.value;

    this.submission.forEach((question: any) => {
      if (question.id == questionId) {
        question.answer = value.trim();
        updated = true;
      }
    });

    if (!updated) {
      this.submission.push({
        id: questionId,
        answer: value.trim(),
      });
    }
  }

  checkPauseTime() {
    this.videoPlayer?.nativeElement.addEventListener('timeupdate', () => {
      // console.log(this.videoPlayer.nativeElement);
      // console.log(this.assessments);
      if (
        this.assessments.length > 0 &&
        this.videoPlayer.nativeElement.currentTime >=
          this.assessments[0].startTime * 60 &&
        !this.videoPlayer.nativeElement.paused &&
        !this.passAssessment &&
        !this.showError
      ) {
        this.videoPlayer.nativeElement.pause();
        this.taskAssessmentModal?.nativeElement.click();
      }
    });
  }

  validateVideoAssessmentAnswer() {
    this.showError = false;

    this.submission.forEach((questionSubmission: any) => {
      this.assessments[0].courseTaskAssessmentQuestions.forEach(
        (question: any) => {
          if (questionSubmission.id == question.id) {
            if (questionSubmission.answer.trim() == question.answer.trim()) {
              questionSubmission.modalMessage = 'Correct';
            } else {
              questionSubmission.modalMessage = 'Incorrect';
              this.passAssessment = false;
              this.showError = true;
            }
          }
        }
      );
    });

    if (!this.showError) {
      this.passAssessment = true;
      this.closeVideoAssessmentModal?.nativeElement.click();
      this.videoPlayer.nativeElement.play();
    }
  }

  retryVideoAssessment() {
    this.showError = false;
    this.passAssessment = true;
  }
}
