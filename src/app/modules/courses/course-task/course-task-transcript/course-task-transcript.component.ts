import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Editor } from 'ngx-editor';

import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

@Component({
  selector: 'app-course-task-transcript',
  templateUrl: './course-task-transcript.component.html',
  styleUrls: ['./course-task-transcript.component.css'],
})
export class CourseTaskTranscriptComponent {
  loggedInUser: any;
  permission: any = {
    videoTranscript: {
      update: false,
    },
  };

  courseId: any;
  enrollmentId: any;
  taskId: any;
  taskDetails: any;

  videoTranscript: any = {
    id: '',
    content: '',
  };

  editorVideoTranscript: Editor = new Editor();
  toolbar = this.config.toolbar;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private apiServices: ApiService,
    private courseTaskService: CourseTaskService,
    private config: ConfigService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    if (this.loggedInUser.role.title == 'Administrator') {
      this.permission = { videoTranscript: { update: true } };
    }

    this.courseTaskService.getEnrollmentId().subscribe((data: any) => {
      this.enrollmentId = data;
    });

    this.courseTaskService.getCourseId().subscribe((data: any) => {
      this.courseId = data;
    });

    this.courseTaskService.getTaskId().subscribe((data: any) => {
      this.taskId = data;
    });

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
      this.toastr.success('Transcript updated successfully!');
      this.courseTaskService.callTaskDetailsAPI(
        this.taskId,
        this.courseId,
        this.enrollmentId
      );
    });
  }

  setVideoTranscript(transcript: any) {
    this.videoTranscript = {
      id: transcript.id || null,
      content: transcript.content || null,
    };
  }
}
