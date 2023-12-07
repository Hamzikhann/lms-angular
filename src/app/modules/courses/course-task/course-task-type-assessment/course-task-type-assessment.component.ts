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
  enrollmentId: any;
  taskId: any;
  taskIdNext: any;
  taskDetails: any;

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

  passAssessment: boolean = false;

  showError: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private apiServices: ApiService,
    private courseTaskService: CourseTaskService
  ) {}

  @ViewChild('closeAssessmentModal') closeAssessmentModal:
    | ElementRef
    | undefined;
  @ViewChild('closeQuestionModal') closeQuestionModal: ElementRef | undefined;

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
    this.enrollmentId = this.courseTaskService.getEnrollmentId();

    this.courseTaskService.getTaskId().subscribe((data: any) => {
      this.taskId = data;
    });

    this.courseTaskService.getTaskIdNext().subscribe((data: any) => {
      this.taskIdNext = data;
    });

    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
      if (
        this.taskDetails.courseTaskType.title == 'Assessment' &&
        this.taskDetails.progress != '0'
      ) {
        this.submitted = true;
      }
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
      if (this.closeAssessmentModal) {
        this.closeAssessmentModal.nativeElement.click();
      }
      this.toastr.success('Assessment added successfully!');
      this.courseTaskService.callAssessmentAPI(this.taskId);
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
      if (this.closeAssessmentModal) {
        this.closeAssessmentModal.nativeElement.click();
      }
      this.toastr.success('Assessment updated successfully!');
      this.courseTaskService.callAssessmentAPI(this.taskId);
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
      if (this.closeAssessmentModal) {
        this.closeAssessmentModal.nativeElement.click();
      }
      this.toastr.success('Assessment deleted successfully!');
      this.courseTaskService.callAssessmentAPI(this.taskId);
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
      if (this.closeQuestionModal) {
        this.closeQuestionModal.nativeElement.click();
      }
      this.toastr.success('Question added successfully!');
      this.resetAssessmentQuestionData();
      this.courseTaskService.callAssessmentAPI(this.taskId);
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
      if (this.closeQuestionModal) {
        this.closeQuestionModal.nativeElement.click();
      }
      this.toastr.success('Question updated successfully!');
      this.resetAssessmentQuestionData();
      this.courseTaskService.callAssessmentAPI(this.taskId);
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
      if (this.closeQuestionModal) {
        this.closeQuestionModal.nativeElement.click();
      }
      this.toastr.success('Question deleted successfully!');
      this.resetAssessmentQuestionData();
      this.courseTaskService.callAssessmentAPI(this.taskId);
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
        this.courseTaskService.callTaskDetailsAPI(this.taskId);
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
        'new',
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
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
      this.submitted = true;
    }, 5000);

    var result = (questionsCorrect / questionsTotal) * 100;
    this.toastr.success('Assessment submitted!');

    if (this.loggedInUser.role.title == 'User') {
      this.updateTaskProgress(result);
    }
  }
  retryAssessment() {
    this.submitted = false;
    this.error = false;
    this.courseTaskService.callAssessmentAPI(this.taskId);
  }
}
