import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css'],
})
export class EnrollmentsComponent {
  courses: any = [];
  enrollmentTypes: any = [];

  enrollments: any = [];
  enrollment: any = {
    id: '',
    required: '',
    assignmentId: '',
    typeId: '',
  };
  enrollmentFormType: string = 'create';

  constructor(private toastr: ToastrService, private apiServices: ApiService) {}

  ngOnInit(): void {
    this.getAssignedCourses();
    this.getEnrollmentTypes();
    this.getEnrollments();
  }

  getAssignedCourses() {
    const data = {
      path: 'courses/list/assigned',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.courses = response.data;
      console.log(this.courses);
    });
  }

  getEnrollmentTypes() {
    const data = {
      path: 'course/enrollments/list/types',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.enrollmentTypes = response.data;
    });
  }

  getEnrollments() {
    const data = {
      path: 'course/enrollments/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.enrollments = response.data;
      console.log(this.enrollments);
    });
  }

  createEnrollment() {
    const data = {
      path: 'course/enrollments/create',
      payload: {
        required: this.enrollment.required,
        assignmentId: this.enrollment.assignmentId,
        courseEnrollmentTypeId: this.enrollment.typeId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.toastr.success('Course has been enrolled successfully');
      this.resetEnrollmentData();
      this.getEnrollments();
    });
  }

  deleteEnrollment() {
    const data = {
      path: 'course/enrollments/delete',
      payload: {
        courseEnrollmentId: this.enrollment.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.toastr.success('Course enrollment has been removed successfully');
      this.resetEnrollmentData();
      this.getEnrollments();
    });
  }

  setEnrollment(enrollment: any) {
    this.enrollment = {
      id: enrollment.id,
      required: enrollment.required,
      assignmentId: enrollment.courseAssignmentId,
      typeId: enrollment.courseEnrollmentTypeId,
    };
  }

  setEnrollmentFormType(name: string) {
    this.enrollmentFormType = name;
  }

  resetEnrollmentData() {
    this.enrollment = {
      id: '',
      required: '',
      assignmentId: '',
      courseEnrollmentTypeId: '',
    };
  }
}
