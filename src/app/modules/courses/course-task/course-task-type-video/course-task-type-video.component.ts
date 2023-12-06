import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Editor, Toolbar } from 'ngx-editor';

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

    this.route.parent?.params.subscribe((params: any) => {
      this.courseId = params.id;
      this.getCourseDetails();
    });
    console.log(this.taskId);
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

  getAssessments() {
    const data = {
      path: 'course/task/assessments/list ',
      payload: {
        courseTaskId: this.taskId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.assessments = response.data;
      console.log(this.assessments);
      this.assessments.forEach((assignment: any) => {
        assignment.courseTaskAssessmentQuestions.forEach((question: any) => {
          var options = question.options.split(',');
          question.options = this.shuffleAssessmentOptions(options);
        });
      });
    });
  }

  shuffleAssessmentOptions(array: any) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
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
