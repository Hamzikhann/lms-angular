import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';

declare var YT: any;

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css'],
})
export class LectureComponent {
  ImgBaseURL: string = this.config.ImgBaseURL;
  VideoBaseURL: string = this.config.VideoBaseURL;

  loggedInUser: any;
  permission: any = {
    assessment: {
      create: false,
      update: false,
      delete: false,
      submit: true,
    },
    question: {
      create: false,
      update: false,
      delete: false,
      view: { answer: false },
    },
  };

  courseId: any;
  courseDetails: any;
  taskId: any;
  taskIdPrevious: any;
  taskIdNext: any;
  taskDetails: any;
  enrollmentId: string = '';
  syllabus: any = {
    id: '',
    title: '',
  };
  modules: any;

  assessmentFormType: string = '';
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
  questionFormType: string = '';

  submission: any = [];
  submitted: boolean = false;
  error: boolean = false;

  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private apiServices: ApiService,
    private route: ActivatedRoute,
    private config: ConfigService,
    private router: Router
  ) {}

  @ViewChild('closeModal') closeModal: ElementRef | undefined;
  @ViewChild('questionModalBtnClose') questionModalBtnClose:
    | ElementRef
    | undefined;

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
        this.getAssessments();
      });
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

        if (task.progress == '100') {
          taskTodo = tasks[key + 1] ? tasks[key + 1] : null;
        }
      });

      if (this.loggedInUser.role.title == 'User') {
        for (let index = taskTodo.index + 1; index < tasks.length; index++) {
          tasks[index].disabled = true;
        }
      }
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
      this.assessments.forEach((assignment: any) => {
        assignment.courseTaskAssessmentQuestions.forEach((question: any) => {
          question.options = question.options.split(',');
        });
      });
    });
  }

  updateTaskProgress() {
    const data = {
      path: 'course/tasks/progress',
      payload: {
        currentTime: '',
        percentage: '100',
        courseId: this.courseId,
        courseTaskId: this.taskId,
        courseEnrollmentId: this.enrollmentId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.getModules();
      this.goToNextTask();
    });
  }

  goToNextTask() {
    if (this.taskIdNext) {
      this.router.navigate([
        '/courses',
        this.courseId,
        'task',
        this.taskIdNext,
      ]);
    } else {
      this.router.navigate(['/courses', this.courseId, 'achievements']);
    }
  }

  createAssessment() {
    const data = {
      path: 'course/task/assessments/create ',
      payload: {
        courseTaskId: this.taskId,
        title: this.assessment.title,
        description: this.assessment.description,
        estimatedTime: this.assessment.estimatedTime,
        startTime: this.assessment.startTime,
        questions: [],
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.toastr.success('Assessment added successfully!');
      this.getAssessments();
    });
  }
  updateAssessment() {
    const data = {
      path: 'course/task/assessments/update',
      payload: {
        courseTaskAssessmentId: this.assessment.id,
        title: this.assessment.title,
        description: this.assessment.description,
        estimatedTime: this.assessment.estimatedTime,
        startTime: this.assessment.startTime,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.toastr.success('Assessment updated successfully!');
      this.getAssessments();
    });
  }
  deleteAssessment() {
    const data = {
      path: 'course/task/assessments/delete',
      payload: {
        courseTaskAssessmentId: this.assessment.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.toastr.success('Assessment deleted successfully!');
      this.getAssessments();
    });
  }
  setAssessment(assessment: any) {
    this.assessment = {
      id: assessment.id,
      title: assessment.title,
      estimatedTime: assessment.estimatedTime,
      description: assessment.description,
      startTime: assessment.startTime,
    };
  }
  setAssessmentFormType(name: any) {
    this.assessmentFormType = name;
  }
  resetAssessmentData() {
    this.assessmentFormType = 'create';
    this.assessment = {
      id: '',
      title: '',
      description: '',
      estimatedTime: '',
      startTime: '',
    };
  }

  createAssessmentQuestion() {
    const data = {
      path: 'course/task/assessments/question/create ',
      payload: {
        courseTaskAssessmentId: this.assessment.id,
        title: this.question.title,
        options: this.question.options,
        answer: this.question.answer,
        type: 'MCQ',
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.questionModalBtnClose) {
        this.questionModalBtnClose.nativeElement.click();
      }
      this.toastr.success('Question added successfully!');
      this.resetAssessmentQuestionData();
      this.getAssessments();
    });
  }
  updateAssessmentQuestion() {
    const data = {
      path: 'course/task/assessments/question/update',
      payload: {
        courseTaskAssessmentQuestionId: this.question.id,
        title: this.question.title,
        options: this.question.options,
        answer: this.question.answer,
        type: this.question.type,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.questionModalBtnClose) {
        this.questionModalBtnClose.nativeElement.click();
      }
      this.toastr.success('Question updated successfully!');
      this.resetAssessmentQuestionData();
      this.getAssessments();
    });
  }
  deleteAssessmentQuestion() {
    const data = {
      path: 'course/task/assessments/question/delete',
      payload: {
        courseTaskAssessmentQuestionId: this.question.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.questionModalBtnClose) {
        this.questionModalBtnClose.nativeElement.click();
      }
      this.toastr.success('Question deleted successfully!');
      this.resetAssessmentQuestionData();
      this.getAssessments();
    });
  }
  setAssessmentQuestion(question: any) {
    this.question = {
      id: question.id,
      title: question.title,
      options: question.options,
      answer: question.answer,
      type: question.type,
    };
  }
  setAssessmentQuestionFormType(name: any) {
    this.questionFormType = name;
  }
  resetAssessmentQuestionData() {
    this.questionFormType = 'create';
    this.question = {
      id: '',
      title: '',
      options: '',
      answer: '',
      type: '',
    };
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

  validateAssessmentAnswer() {
    this.submission.forEach((questionSubmission: any) => {
      this.assessments[0].courseTaskAssessmentQuestions.forEach(
        (question: any) => {
          if (questionSubmission.id == question.id) {
            if (questionSubmission.answer.trim() == question.answer.trim()) {
              questionSubmission.message = 'Correct';
            } else {
              questionSubmission.message = 'Incorrect';
              this.error = true;
            }
          }
        }
      );
    });
    this.submitted = true;

    if (!this.error) {
      this.toastr.success('Assessment submitted successfully!');
      this.updateTaskProgress();
      this.goToNextTask();
      this.submitted = false;
    } else {
      this.toastr.error('Incorrect answers, kindly retry!');
    }
  }

  retryAssessment() {
    this.submitted = false;
    this.error = false;
    this.getAssessments();
  }

  // checkQuizTime() {
  //   var quizTime = 2;

  //   this.videoPlayer?.nativeElement.addEventListener('timeupdate', () => {
  //     if (
  //       this.videoPlayer.nativeElement.currentTime >= quizTime &&
  //       !this.videoPlayer.nativeElement.paused &&
  //       !this.showQuiz &&
  //       !this.passQuiz &&
  //       !this.showError
  //     ) {
  //       this.videoPlayer.nativeElement.pause();
  //       this.showQuiz = true;
  //     }
  //   });
  // }

  // checkAnswer() {
  //   if (this.selectedOption === '4') {
  //     this.videoPlayer.nativeElement.play();
  //     this.showQuiz = false;
  //     this.passQuiz = true;
  //     this.showError = false;
  //   } else {
  //     this.videoPlayer.nativeElement.currentTime;
  //     // this.videoPlayer.nativeElement.play();
  //     this.showQuiz = false;
  //     this.passQuiz = false;
  //     this.showError = true;
  //   }
  //   this.selectedOption = '';
  // }

  // loadVideo() {
  //   const videoId = this.courseDetails?.courseTaskContent?.videoLink;

  //   this.player = new YT.Player('youtube-player', {
  //     videoId: videoId,
  //     playerVars: {
  //       controls: 1,
  //       autoplay: 0,
  //       enablejsapi: 1,
  //       iv_load_policy: 3,
  //     },
  //     events: {
  //       onReady: (event: any) => {
  //         this.player = event.target;
  //         // this.initModalInterval();
  //       },
  //     },
  //   });
  // }

  // initModalInterval() {
  //   this.interval = setInterval(() => {
  //     const currentTime = this.player.getCurrentTime();

  //     if (currentTime >= 3) {
  //       this.pauseVideoAndShowModal();
  //       clearInterval(this.interval);
  //     }
  //   }, 1000);
  // }

  // pauseVideoAndShowModal() {
  //   this.player.pauseVideo();

  //   if (this.questionModalBtn) this.questionModalBtn.nativeElement.click();
  // }

  // checkAnswer() {
  //   if (this.selectedOption === '4') {
  //     if (this.questionModalBtnClose)
  //       this.questionModalBtnClose?.nativeElement.click();
  //     this.player.playVideo();

  //     // this.videoPlayer.nativeElement.play();
  //     // this.showQuiz = false;
  //     // this.passQuiz = true;
  //     // this.showError = false;
  //   } else {
  //     // this.videoPlayer.nativeElement.currentTime;
  //     // // this.videoPlayer.nativeElement.play();
  //     // this.showQuiz = false;
  //     // this.passQuiz = false;
  //     // this.showError = true;
  //   }
  //   this.selectedOption = '';
  // }

  // retryQuiz() {
  //   this.showError = false;
  //   this.passQuiz = true;
  // }
}
