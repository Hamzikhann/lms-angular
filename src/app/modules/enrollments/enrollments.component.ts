import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css'],
})
export class EnrollmentsComponent {
  enrollments: any;

  constructor(private toastr: ToastrService, private apiServices: ApiService) {}
  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  ngOnInit(): void {
    this.getEnrollments();
  }

  getEnrollments() {
    const data = {
      path: 'course/enrollments/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.enrollments = response;
      // console.log(this.enrollments);
    });
  }
}
