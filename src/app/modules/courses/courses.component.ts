import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  courses: any;
  courseSelected: any;
  courseDetails: any;
  courseInstructors: any;

  constructor(private toastr: ToastrService, private apiServices: ApiService) {}
  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  ngOnInit(): void {
    this.getCourses();
  }

  setCourse(course: any) {
    this.courseSelected = course;
  }

  getCourses() {
    const data = {
      path: 'courses/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.courses = data;
      console.log(this.courses);
    });
  }
}
