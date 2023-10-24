import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})
export class EnrollmentsComponent implements OnInit {

  enrollments: any;

  constructor() { }

  ngOnInit(): void {
    this.enrollments = [
      {
        title: 'O Levels',
        content: 'Summers 2022',
        status: 'active',
        courses: ['Biology', 'Mathematics', 'Physics', 'Pakistan Studies']
      },
      {
        title: 'Matriculation',
        content: 'Regular Session',
        status: 'inactive',
        courses: ['Computer Science', 'Chemistry']
      },
    ]
  }

}
