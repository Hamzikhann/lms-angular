import { Component, ElementRef, ViewChild } from '@angular/core';

import { ConfigService } from 'src/app/config/config.service';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

@Component({
  selector: 'app-course-task-type-video',
  templateUrl: './course-task-type-video.component.html',
  styleUrls: ['./course-task-type-video.component.css'],
})
export class CourseTaskTypeVideoComponent {
  VideoBaseURL: string = this.config.VideoBaseURL;

  allowMarkAsComplete: boolean = false;
  courseId: any;
  enrollmentId: string = '';
  taskId: any;
  taskDetails: any;
  assessments: any = [];

  submission: any = [];
  submitted: boolean = false;
  passAssessment: boolean = false;
  showError: boolean = false;

  constructor(
    private courseTaskService: CourseTaskService,
    private config: ConfigService
  ) {}
  @ViewChild('videoPlayer') videoPlayer: ElementRef | any;
  @ViewChild('taskAssessmentModal') taskAssessmentModal: ElementRef | undefined;
  @ViewChild('closeVideoAssessmentModal') closeVideoAssessmentModal:
    | ElementRef
    | undefined;

  ngOnInit(): void {
    this.courseTaskService.getCourseId().subscribe((data: any) => {
      this.courseId = data;
    });

    this.courseTaskService.getEnrollmentId().subscribe((data: any) => {
      this.enrollmentId = data;
    });

    this.courseTaskService.getTaskId().subscribe((data: any) => {
      this.taskId = data;
    });

    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = null;
      setTimeout(() => {
        this.taskDetails = data;
      }, 100);
    });

    this.courseTaskService.getAssessments().subscribe((data: any) => {
      this.assessments = data;
    });
  }

  isFormComplete(): boolean {
    return (
      this.submission.length ===
      this.assessments[0].courseTaskAssessmentQuestions.length
    );
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
      this.allowMarkAsComplete = true;
      this.passAssessment = true;
      this.closeVideoAssessmentModal?.nativeElement.click();
      this.videoPlayer.nativeElement.play();
      this.courseTaskService.updateAllowMarkAsComplete(true);
    }
  }
  // send_Allow_Mark_As_Complete_Flag() {
  //   return this.allowMarkAsComplete;
  // }
  retryVideoAssessment() {
    this.showError = false;
    this.passAssessment = true;
  }
}
