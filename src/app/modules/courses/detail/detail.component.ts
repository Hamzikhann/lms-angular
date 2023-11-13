import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  ImgBaseURL: string = this.config.ImgBaseURL;
  courseId: any;
  courseDetails: any;
  instructor: any;

  sections: any = {
    about: false,
    index: false,
    books: false,
    links: false,
    faqs: false,
  };
  courseEnrollmentDetails: any;
  courseEnrollmentId: any;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private config: ConfigService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.courseEnrollmentId = this.route.snapshot.paramMap.get('id');

    this.getCourseDetails();
    this.getCourseEnrollmentDetails();

    if (this.router.url.includes('task')) {
      this.sections.index = true;
    } else if (this.router.url.includes('books')) {
      this.sections.books = true;
    } else if (this.router.url.includes('links')) {
      this.sections.links = true;
    } else if (this.router.url.includes('faqs')) {
      this.sections.faqs = true;
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
      // console.log(this.courseDetails);
    });
  }

  getCourseEnrollmentDetails() {
    const data = {
      path: 'course/enrollments/detail',
      payload: {
        courseEnrollmentId: this.courseEnrollmentId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.courseEnrollmentDetails = data;
      console.log(this.courseEnrollmentDetails);
    });
  }

  toggleSection(name: string) {
    this.sections = {
      about: false,
      index: false,
      books: false,
      links: false,
      faqs: false,
    };
    this.sections[name] = true;
  }
}
