import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Editor, Toolbar } from 'ngx-editor';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

@Component({
  selector: 'app-course-task-transcript',
  templateUrl: './course-task-transcript.component.html',
  styleUrls: ['./course-task-transcript.component.css'],
})
export class CourseTaskTranscriptComponent {
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
    this.taskId = this.courseTaskService.getTaskId();

    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
    });
  }

  updateVideoTranscript() {
    var data: any = {
      path: 'course/task/transcript/update',
      payload: {
        courseTaskId: this.taskId,
        content: this.videoTranscript.content,
      },
    };
    if (this.videoTranscript.id) {
      data.payload.transcriptId = this.videoTranscript.id;
    }
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.toastr.success('Transcript updated successfully!');
      this.courseTaskService.callTaskDetailsAPI();
    });
  }

  setVideoTranscript(transcript: any) {
    this.videoTranscript = {
      id: transcript.id || null,
      content: transcript.content || null,
    };
  }
}
