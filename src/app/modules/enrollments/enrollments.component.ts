import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css'],
})
export class EnrollmentsComponent {
  loggedInUser: any;
  courses: any = [];
  userDepartments: any = [];
  users: any = [];
  teams: any = [];
  enrollmentTypes: any = [];
  enrollments: any = [];
  enrollment: any = {
    id: '',
    required: '',
    assignmentId: '',
    typeId: '',
    type: '',
    departmentId: '',
    userId: '',
    teamId: '',
  };
  enrollmentFormType: string = 'create';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiServices: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    if (this.loggedInUser.role.title == 'Client') {
      this.getAssignedCourses();
      this.getEnrollmentTypes();
      this.getUserDepartments();
      this.getUsers();
      this.getTeams();
      this.getEnrollments();
    } else {
      this.router.navigate(['/']);
    }
  }

  getAssignedCourses() {
    const data = {
      path: 'courses/list/assigned',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.courses = response.data;
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

  getUserDepartments() {
    const data = {
      path: 'users/list/departments',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.userDepartments = response.data;
    });
  }

  getUsers() {
    const data = {
      path: 'users/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.users = response.data;
    });
  }

  getTeams() {
    const data = {
      path: 'teams/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.teams = response.data;
    });
  }

  setAccessLevel() {
    const typeId = this.enrollment.typeId;
    this.enrollmentTypes.forEach((type: any) => {
      if (typeId == type.id) this.enrollment.type = type.title;
    });
  }

  getEnrollments() {
    const data = {
      path: 'course/enrollments/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.enrollments = response.data;
      this.enrollments.forEach((enrollment: any) => {
        enrollment.date = moment(enrollment.date).format('DD/MM/YYYY');
      });
    });
  }

  createEnrollment() {
    const data = {
      path: 'course/enrollments/create',
      payload: {
        required: this.enrollment.required,
        assignmentId: this.enrollment.assignmentId,
        courseEnrollmentTypeId: this.enrollment.typeId,
        userDepartmentId: this.enrollment.departmentId,
        userId: this.enrollment.userId,
        teamId: this.enrollment.teamId,
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
    this.enrollmentFormType = 'create';
    this.enrollment = {
      id: '',
      required: '',
      assignmentId: '',
      courseEnrollmentTypeId: '',
      type: '',
      departmentId: '',
      userId: '',
      teamId: '',
    };
  }
}
