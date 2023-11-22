import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-course-assignmnet-report',
  templateUrl: './course-assignmnet-report.component.html',
  styleUrls: ['./course-assignmnet-report.component.css'],
})
export class CourseAssignmnetReportComponent {
  courseAssignmentId: any;
  courseAssignmentReport: any;

  loading: boolean = false;

  dtOptions: any = {
    aaSorting: [],
    columnDefs: [{}],
    order: [[0, 'desc']],
  };

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.courseAssignmentId = this.route.snapshot.paramMap.get('id');
    this.getCourseAssignmentReport();
  }

  getCourseAssignmentReport() {
    this.loading = true;
    this.courseAssignmentReport = [];

    const data = {
      path: 'course/assignment/report',
      payload: {
        courseAssignmentId: this.courseAssignmentId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.courseAssignmentReport = response.data;
      this.loading = false;
      console.log(this.courseAssignmentReport);
    });
  }
}
