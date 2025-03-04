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
  courseDetails: any;
  courseSyllabus: any;
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
    type: '',
  };

  question: any = {
    id: '',
    title: '',
    options: '',
    answer: '',
    // type: '',
  };
  questionType: string = '';

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

    this.courseTaskService.getEnrollmentId().subscribe((data: any) => {
      this.enrollmentId = data;
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
      console.log(data);
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
        // questionType: this.assessment.type,
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
        type: this.questionType,
      },
    };
    // if(this.assessments[0].questionType=='mcqs'){

    //   data.payload.title=this.question.title
    //   data.payload.courseTaskAssessmentId=this.assessment.id
    //   data.payload.options=this.question.options
    //   data.payload.answer=this.question.answer
    //   data.payload.type=this.questionType
    // }else{
    //   data.payload.courseTaskAssessmentId=this.assessment.id
    //   data.payload.title=this.question.title
    //   data.payload.type=this.questionType

    // }
    console.log(data);
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
    var options = '';
    question.options.forEach((option: any, key: any) => {
      options += option.trim();
      if (key != question.options.length - 1) {
        options += ', ';
      }
    });
    this.question = {
      id: question.id,
      title: question.title,
      options: options,
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

  getSubmissions(event: any, questionId: string, type: string) {
    var updated = false;
    var value = event.target.value;
    console.log(type);

    this.submission.forEach((question: any) => {
      if (question.id == questionId) {
        question.answer = value.trim();
        // question.type=type.trim()
        updated = true;
      }
    });
    console.log('submision', this.submission);
    if (!updated) {
      this.submission.push({
        id: questionId,
        answer: value.trim(),
        type: type.trim(),
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
      console.log(data);
      console.log(this.taskDetails.courseTaskType.title);
      if (this.taskDetails.courseTaskType.title == 'Assessment') {
        this.courseTaskService.callTaskDetailsAPI(
          this.taskId,
          this.courseId,
          this.enrollmentId
        );

        window.scroll({
          top: 0,
          behavior: 'smooth',
        });
        setTimeout(() => {
          if (!this.taskIdNext && this.taskDetails.progress != '0') {
            const userRole = this.loggedInUser.role.title;
            this.router.navigate([
              '/courses',
              userRole == 'User' ? this.enrollmentId : this.courseId,
              'achievements',
            ]);
          }
        }, 5000);
      } else {
        this.goToNextTask();
      }

      this.courseTaskService.callEnrollmentAPI(this.enrollmentId);
      this.reloadCourseModules();
    });
  }
  goToNextTask() {
    const userRole = this.loggedInUser.role.title;
    if (this.taskIdNext) {
      this.router.navigate([
        '/courses',
        userRole == 'User' ? this.enrollmentId : this.courseId,
        'task',
        this.taskIdNext,
      ]);
    } else {
      this.router.navigate([
        '/courses',
        userRole == 'User' ? this.enrollmentId : this.courseId,
        'achievements',
      ]);
    }
  }
  validateAssessmentAnswer() {
    this.error = false;
    var questionsTotal =
      this.assessments[0].courseTaskAssessmentQuestions.length;
    var questionsCorrect = 0;
    console.log('assesment', this.assessments);
    console.log('valid submission', this.submission);
    this.submission.forEach((questionSubmission: any) => {
      this.assessments[0].courseTaskAssessmentQuestions.forEach(
        (question: any) => {
          if (questionSubmission.id == question.id && question.type == 'mcqs') {
            if (questionSubmission.answer.trim() == question.answer.trim()) {
              questionSubmission.message = 'Correct';
              questionsCorrect++;
            } else {
              questionSubmission.message = 'Incorrect';
              this.error = true;
            }
          } else if (
            questionSubmission.id == question.id &&
            question.type == 'questions'
          ) {
            const data = {
              path: 'course/task/assessments/question/check',
              payload: {
                answer: questionSubmission.answer,
                question: question.title,
              },
            };
            this.apiServices.postRequest(data).subscribe((res) => {
              console.log('res of question', res);
              if (res.result == 'true') {
                questionSubmission.message = 'Correct';
                questionsCorrect++;
              } else {
                questionSubmission.message = 'Incorrect';
                this.error = true;
              }
            });
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

    setTimeout(() => {
      console.log(questionsCorrect);
      var result = (questionsCorrect / questionsTotal) * 100;
      this.toastr.success('Assessment submitted!');
      console.log('result', result);
      if (this.loggedInUser.role.title == 'User') {
        this.updateTaskProgress(result);
      }
    }, 1000);

    // console.log(questionsCorrect)
    //     var result = (questionsCorrect / questionsTotal) * 100;
    //     this.toastr.success('Assessment submitted!');
    // console.log("result",result)
    //     if (this.loggedInUser.role.title == 'User') {
    //       this.updateTaskProgress(result);
    //     }
  }
  retryAssessment() {
    this.submitted = false;
    this.error = false;
    this.courseTaskService.callAssessmentAPI(this.taskId);
  }

  reloadCourseModules() {
    this.courseTaskService.callModulesAPI(
      this.courseSyllabus.id,
      this.enrollmentId
    );
  }
}
