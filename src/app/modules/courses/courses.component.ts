import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  permission: any = { create: true, update: true, delete: true };
  courses: any;
  courseSelected: any;
  courseDetails: any;
  courseInstructors: any;

  constructor(private toastr: ToastrService, private apiServices: ApiService) {}
  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    const data = {
      path: 'courses/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.courses = data;
    });
  }

  deleteCourse() {
    const data = {
      path: 'courses/delete',
      payload: {
        courseId: this.courseSelected.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data: any) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.toastr.success('Course deleted successfully!');
      this.getCourses();
    });
  }

  setCourse(course: any) {
    this.courseSelected = course;
  }
}
