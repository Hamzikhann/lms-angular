import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  permission: any = { create: false, update: false, delete: false };
  courses: any;
  courseSelected: any;
  courseDetails: any;
  courseInstructors: any;
  loggedInUser: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiServices: ApiService,
    private authService: AuthService
  ) {}
  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    if (this.loggedInUser.role.title == 'Administrator') {
      this.permission = { create: true, update: true, delete: true };
    }
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
