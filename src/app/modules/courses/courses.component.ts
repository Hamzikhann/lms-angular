import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: any = [];
  courseSelected: any = [];

  constructor() { }

  ngOnInit(): void {
    this.courses = [
      {
        title: 'Statistics and Probability', 
        code: 'STA301',
        category: 'Mathematics',
        instructor: {
          name: 'Dr. Saleha Naghmi',
          degree: 'PHD',
          university: 'National College of Business Administration and Economics',
          image: '/assets/images/people/50/woman-1.jpg'
        },
        updates: 3
      }, 
      {
        title: 'Principles of Marketing', 
        code: 'MGT301',
        category: 'Marketing',
        instructor: {
          name: 'Dr. Muhammad Rizwan Saleem Sandhu',
          degree: 'PhD Management (SME Branding) ',
          university: 'University of Management and Technology, Lahore',
          image: '/assets/images/people/50/guy-1.jpg'
        },
        updates: 1
      }, 
      {
        title: 'International Relations', 
        code: 'PSC201',
        category: 'Management',
        instructor: {
          name: 'Syed Muhammad Ali',
          degree: 'Masters Degree (Development Studies)',
          university: 'Melbourne University, Melbourne',
          image: '/assets/images/people/50/guy-2.jpg'
        },
        updates: 0
      }, 
      {
        title: 'Business Finance', 
        code: 'ACC501',
        category: 'Accounting',
        instructor: {
          name: 'Dr. Talat Afza ',
          degree: 'PHD',
          university: 'Wayne State University, USA',
          image: '/assets/images/people/50/woman-3.jpg'
        },
        updates: 0
      }, 
      {
        title: 'Introduction to Programming', 
        code: 'CS201',
        category: 'Information Technology',
        instructor: {
          name: 'Dr. Naveed A. Malik',
          degree: 'ScD Electrical Engineering',
          university: 'Massachusetts Institute of Technology, USA',
          image: '/assets/images/people/50/guy-5.jpg'
        },
        updates: 2
      }, 
    ]
  }

  setCourse(course: any) {
    this.courseSelected = course;
  }
}
