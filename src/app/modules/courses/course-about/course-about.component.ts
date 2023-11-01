import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-about',
  templateUrl: './course-about.component.html',
  styleUrls: ['./course-about.component.css'],
})
export class CourseAboutComponent {
  courseId: any;
  courseDetails: any;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
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
}
