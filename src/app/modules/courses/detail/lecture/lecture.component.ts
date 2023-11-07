import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';

declare var YT: any;

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css'],
})
export class LectureComponent {
  private player: any;
  private interval: any;

  courseId: any;
  taskId: any;

  instructor: any;
  sections: any = {
    videos: true,
    handouts: false,
    presentations: false,
  };
  taskDetails: any;
  courseDetails: any;

  ImgBaseURL: string = this.config.ImgBaseURL;

  permission: any = {
    module: { create: true, update: true, delete: true },
    question: { create: true, update: true, delete: true },
    assessment: { create: true, update: true, delete: true },
  };

  assessmentType: string = '';
  assessments: any;

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
  assessmentQuestionType: string = '';

  passQuiz: boolean = false;
  showError = false;

  selectedOption: string = '';

  options = [
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private route: ActivatedRoute,
    private config: ConfigService
  ) {}

  @ViewChild('closeModal') closeModal: ElementRef | undefined;
  @ViewChild('questionModalBtn') questionModalBtn: ElementRef | undefined;
  @ViewChild('questionModalBtnClose') questionModalBtnClose:
    | ElementRef
    | undefined;

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.taskId = this.route.snapshot.paramMap.get('taskId');

    console.log(this.taskId);
    this.getCourseDetails();

    this.getTaskDetails();

    this.getAssessments();

    this.loadVideo();

    this.instructor = {
      name: 'Dr. Saleha Naghmi',
      qualification: 'PhD.',
      institute:
        'National College of Business Administration and Economics (NCBA&E)',
      image: '/assets/images/people/50/woman-6.jpg',
      email: 'farwa.amin@vu.edu.pk ',
      bio: 'I give personalized attention to all my students and success is a guarantee as per their dedication, .. My method of tutoring is based on jolly Phonics for kindergarten which involves having interactive sessions with them.',
    };
  }

  toggleSection(name: string) {
    this.sections = {
      videos: false,
      handouts: false,
      presentations: false,
    };
    this.sections[name] = true;
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

      console.log(this.courseDetails);
    });
  }

  getTaskDetails() {
    const data = {
      path: 'course/tasks/detail',
      payload: {
        courseTaskId: this.taskId,
      },
    };

    this.apiServices.postRequest(data).subscribe((response) => {
      this.taskDetails = response.data;
      // if (this.taskDetails.courseTaskType.title == 'Video') {
      // this.loadVideo();
      // }
      console.log(this.taskDetails);
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

  setAssessmentType(name: any) {
    this.assessmentType = name;
  }

  resetAssessmentData() {
    this.assessmentType = 'create';
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
        type: this.question.type,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.toastr.success('Question added successfully!');
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
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.toastr.success('Question updated successfully!');
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
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.toastr.success('Question deleted successfully!');
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

  setAssessmentQuestionType(name: any) {
    this.assessmentQuestionType = name;
  }

  resetAssessmentQuestionData() {
    this.assessmentQuestionType = 'create';
    this.question = {
      id: '',
      title: '',
      options: '',
      answer: '',
      type: '',
    };
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

  loadVideo() {
    const videoId = this.courseDetails?.courseTaskContent?.videoLink;

    this.player = new YT.Player('youtube-player', {
      videoId: videoId,
      playerVars: {
        controls: 1,
        autoplay: 0,
        enablejsapi: 1,
        iv_load_policy: 3,
      },
      events: {
        onReady: (event: any) => {
          this.player = event.target;
          // this.initModalInterval();
        },
      },
    });
  }

  initModalInterval() {
    this.interval = setInterval(() => {
      const currentTime = this.player.getCurrentTime();
      console.log(currentTime);

      if (currentTime >= 3) {
        this.pauseVideoAndShowModal();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  pauseVideoAndShowModal() {
    this.player.pauseVideo();
    console.log('asdas');

    if (this.questionModalBtn) this.questionModalBtn.nativeElement.click();
  }

  checkAnswer() {
    if (this.selectedOption === '4') {
      if (this.questionModalBtnClose)
        this.questionModalBtnClose?.nativeElement.click();
      this.player.playVideo();

      // this.videoPlayer.nativeElement.play();
      // this.showQuiz = false;
      // this.passQuiz = true;
      // this.showError = false;
    } else {
      // this.videoPlayer.nativeElement.currentTime;
      // // this.videoPlayer.nativeElement.play();
      // this.showQuiz = false;
      // this.passQuiz = false;
      // this.showError = true;
    }
    this.selectedOption = '';
  }

  retryQuiz() {
    this.showError = false;
    this.passQuiz = true;
  }
}
