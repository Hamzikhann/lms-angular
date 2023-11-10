import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent {
  loggedInUser: any;
  clients: any = [];
  courses: any = [];

  assignments: any = [];
  assignment: any = {
    id: '',
    clientId: '',
    courseId: '',
  };
  assignmentFormType: string = 'create';

  loading: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiServices: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    if (this.loggedInUser.role.title == 'Administrator') {
      this.getClients();
      this.getCourses();
      this.getCourseAssignments();
    } else {
      this.router.navigate(['/']);
    }
  }

  getCourses() {
    this.loading = true;

    const data = {
      path: 'courses/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.courses = response;
      this.loading = false;
    });
  }

  getClients() {
    const data = {
      path: 'clients/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.clients = response.data;
    });
  }

  getCourseAssignments() {
    const data = {
      path: 'course/assignment/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.assignments = response.data;
    });
  }

  createAssignment() {
    const data = {
      path: 'course/assignment/create',
      payload: {
        courseId: this.assignment.courseId,
        clientId: this.assignment.clientId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.toastr.success('Course has been assigned to client');
      this.resetAssignmentData();
      this.getCourseAssignments();
    });
  }

  deleteAssignment() {
    const data = {
      path: 'course/assignment/delete',
      payload: {
        courseAssignmentId: this.assignment.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.toastr.success('Course assignment has been removed for the client');
      this.resetAssignmentData();
      this.getCourseAssignments();
    });
  }

  setAssignment(assignment: any) {
    this.assignment = {
      id: assignment.id,
      clientId: assignment.clientId,
      courseId: assignment.courseId,
    };
  }

  setAssignmentFormType(name: string) {
    this.assignmentFormType = name;
  }

  resetAssignmentData() {
    this.assignmentFormType = 'create';
    this.assignment = {
      id: '',
      clientId: '',
      courseId: '',
    };
  }
}
