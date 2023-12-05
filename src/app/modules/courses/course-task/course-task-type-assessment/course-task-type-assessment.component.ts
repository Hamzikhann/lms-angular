import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Editor, Toolbar } from 'ngx-editor';

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

    this.route.parent?.params.subscribe((params: any) => {
      this.courseId = params.id;
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
        this.getTaskDetails();
      } else {
        this.goToNextTask();
      }
      this.getModules();
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
    this.getAssessments();
  }
}
