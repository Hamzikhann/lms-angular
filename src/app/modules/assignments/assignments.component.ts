import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent {
  clients: any = [];
  courses: any = [];

  assignments: any = [];
  assignment: any = {
    id: '',
    clientId: '',
    courseId: '',
  };
  assignmentFormType: string = 'create';

  constructor(private toastr: ToastrService, private apiServices: ApiService) {}

  ngOnInit(): void {
    this.getClients();
    this.getCourses();
    this.getCourseAssignments();
  }

  getCourses() {
    const data = {
      path: 'courses/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.courses = response;
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
    this.assignment = {
      id: '',
      clientId: '',
      courseId: '',
    };
  }
}
