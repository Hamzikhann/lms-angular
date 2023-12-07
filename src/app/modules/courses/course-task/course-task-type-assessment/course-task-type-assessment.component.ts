import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Editor, Toolbar } from 'ngx-editor';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

@Component({
  selector: 'app-course-task-type-assessment',
  templateUrl: './course-task-type-assessment.component.html',
  styleUrls: ['./course-task-type-assessment.component.css'],
})
export class CourseTaskTypeAssessmentComponent {
  ImgBaseURL: string = this.config.ImgBaseURL;
  VideoBaseURL: string = this.config.VideoBaseURL;

  editorVideoTranscript: Editor = new Editor();
  toolbar = this.config.toolbar;

  loggedInUser: any;
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

  videoTranscript: any = {
    id: '',
    content: '',
  };

  submission: any = [];
  submitted: boolean = false;
  error: boolean = false;

  loading: boolean = false;

  passAssessment: boolean = false;

  showError: boolean = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private apiServices: ApiService,
    private courseTaskService: CourseTaskService,

    private route: ActivatedRoute,
    private config: ConfigService,
    private router: Router
  ) {}

  @ViewChild('closeModal') closeModal: ElementRef | undefined;
  @ViewChild('questionModalBtnClose') questionModalBtnClose:
    | ElementRef
    | undefined;
  @ViewChild('videoPlayer') videoPlayer: ElementRef | any;
  @ViewChild('taskAssessmentModal') taskAssessmentModal: ElementRef | undefined;
  @ViewChild('closeVideoAssessmentModal') closeVideoAssessmentModal:
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
        videoTranscript: {
          update: true,
        },
      };
    }

    this.courseId = this.courseTaskService.getCourseId();
    this.courseDetails = this.courseTaskService.getCourseDetails();

    this.enrollmentId = this.courseTaskService.getEnrollmentId();

    this.taskId = this.courseTaskService.getTaskId();
    this.taskDetails = this.courseTaskService.getTaskDetails();
    this.taskIdNext = this.courseTaskService.getTaskIdNext();

    this.courseTaskService.getModules().subscribe((data: any) => {
      this.modules = data;
    });

    this.courseTaskService.getAssessments().subscribe((data: any) => {
      this.assessments = data;
    });
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
      this.courseTaskService.callAssessmentAPI();
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
      this.courseTaskService.callAssessmentAPI();
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
      this.courseTaskService.callAssessmentAPI();
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
      this.courseTaskService.callAssessmentAPI();
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
      this.courseTaskService.callAssessmentAPI();
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
      this.courseTaskService.callAssessmentAPI();
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

  setAssessmentQuestionFormType(name: any) {
    this.questionFormType = name;
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

  updateTaskProgress(percentage: any) {
    const data = {
      path: 'course/tasks/progress',
      payload: {
        currentTime: '',
        percentage: percentage.toString(),
        courseId: this.courseId,
        courseTaskId: this.taskId,
        courseEnrollmentId: this.enrollmentId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.taskDetails.courseTaskType.title == 'Assessment') {
        this.courseTaskService.getTaskDetails();
      } else {
        this.goToNextTask();
      }
      this.courseTaskService.callModulesAPI();
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

  validateAssessmentAnswer() {
    this.error = false;
    var questionsTotal =
      this.assessments[0].courseTaskAssessmentQuestions.length;
    var questionsCorrect = 0;

    this.submission.forEach((questionSubmission: any) => {
      this.assessments[0].courseTaskAssessmentQuestions.forEach(
        (question: any) => {
          if (questionSubmission.id == question.id) {
            if (questionSubmission.answer.trim() == question.answer.trim()) {
              questionSubmission.message = 'Correct';
              questionsCorrect++;
            } else {
              questionSubmission.message = 'Incorrect';
              this.error = true;
            }
          }
        }
      );
    });
    setTimeout(() => {
      this.submitted = true;
    }, 10000);

    var result = (questionsCorrect / questionsTotal) * 100;
    this.toastr.success('Assessment submitted!');

    if (this.loggedInUser.role.title == 'User') {
      this.updateTaskProgress(result);
    }

    if (!this.error) {
      this.goToNextTask();
      this.submitted = false;
    }
  }

  retryAssessment() {
    this.submitted = false;
    this.error = false;
    this.courseTaskService.callAssessmentAPI();
  }
}
