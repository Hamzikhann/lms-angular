import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  courseEnrollmentDetails: any = null;
  instructor: any;

  sections: any = {
    about: false,
    index: false,
    eBook: false,
    links: false,
    faqs: false,
    achievements: false,
    discussion: false,
  };

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private apiServices: ApiService,
    private config: ConfigService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseDetails();

    if (this.router.url.includes('modules')) {
      this.sections.index = true;
    } else if (this.router.url.includes('eBook')) {
      this.sections.eBook = true;
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
      // console.log(this.courseDetails);
    });
  }

  toggleSection(name: string) {
    this.sections = {
      about: false,
      index: false,
      eBook: false,
      links: false,
      faqs: false,
      achievements: false,
      discussion: false,
    };
    this.sections[name] = true;
  }
}
