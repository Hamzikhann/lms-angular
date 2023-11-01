import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
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
    about: true,
    index: false,
    books: false,
    links: false,
    faqs: false,
  };

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private config: ConfigService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseDetails();
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
