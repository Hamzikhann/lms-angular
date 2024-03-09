import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  ImgBaseURL: string = this.config.ImgBaseURL;
  loggedInUser: any;
  courseId: any;
  courseDetails: any;
  enrollmentDetails: any;
  enrollmentId: any;
  instructor: any;

  sections: any = {
    about: false,
    index: false,
    books: false,
    links: false,
    faqs: false,
    achievements: false,
    discussion: false,
  };

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private apiServices: ApiService,
    private courseTaskService: CourseTaskService,
    private config: ConfigService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());

    console.log(this.loggedInUser.role.title);
    if (this.loggedInUser.role.title == 'User') {
      this.enrollmentId = this.route.snapshot.paramMap.get('id');
      this.getCourseEnrollmentDetails();
    } else {
      this.courseId = this.route.snapshot.paramMap.get('id');
      this.getCourseDetails();
    }

    if (this.router.url.includes('task')) {
      this.sections.index = true;
    } else if (this.router.url.includes('books')) {
      this.sections.books = true;
    } else if (this.router.url.includes('links')) {
      this.sections.links = true;
    } else if (this.router.url.includes('faqs')) {
      this.sections.faqs = true;
    } else if (this.router.url.includes('achievements')) {
      this.sections.achievements = true;
    } else if (this.router.url.includes('discussion')) {
      this.sections.discussion = true;
    } else {
      this.sections.about = true;
    }
  }

  getCourseDetails() {
    const data = {
      path: 'courses/detail',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.courseDetails = data;
      this.courseTaskService.setCourse(this.courseId, this.courseDetails);
      this.courseTaskService.setEnrollmentId(null);
      this.courseTaskService.setEnrollmentDetails(null);
    });
  }

  getCourseEnrollmentDetails() {
    const data = {
      path: 'courses/enrollment/detail/',
      payload: {
        enrollmentId: this.enrollmentId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.courseId = response.data.courseId;
      this.courseDetails = response.data.course;
      this.enrollmentDetails = response.data.enrollment;

      this.courseTaskService.setCourse(this.courseId, this.courseDetails);
      this.courseTaskService.setEnrollmentId(this.enrollmentDetails.id);
      this.courseTaskService.setEnrollmentDetails(this.enrollmentDetails);
    });
  }

  toggleSection(name: string) {
    this.sections = {
      about: false,
      index: false,
      books: false,
      links: false,
      faqs: false,
      achievements: false,
      discussion: false,
    };
    this.sections[name] = true;
  }
}
