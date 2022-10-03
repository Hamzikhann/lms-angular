import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  announcements: any;

  constructor() { }

  ngOnInit(): void {
    this.announcements = [
      {
        createdAt: { date: '03', month: 'Oct', year: '2021' },
        instructor: 'Ahmad Shah',
        content: "Dear All, Welcome to our Mathematics class! We are so thrilled to have you on board and hope that this session will be very fruitful for you! Please note that throughout this session we will be posting the recording links of the lectures, within 9 hours of the class, in the announcements tab. If you have any difficulty in accessing the recordings please don't hesitate to reach out!",
        course: 'Mathematics'
      },
      {
        createdAt: { date: '14', month: 'Sep', year: '2021' },
        instructor: 'Muhammad Afzaal Khan',
        content: "Dear all students, due to some technical issue mam maria could not attend today's class so the class is rescheduled to Thursday from 4:40 to 5:30 same time. The class link is the same and you can join from wasayil portal as well. thanks",
        course: 'Urdu Second Language'
      }, 
      {
        createdAt: { date: '23', month: 'Sep', year: '2021' },
        instructor: 'Entuition Team',
        content: "Dear Students, Please note physics classes have been shifted permanently to 7 40 p.m.- 8 30 p.m. (Monday, Tuesday, Wednesday and Thursday)",
        course: 'Physics'
      }, 
      {
        createdAt: { date: '09', month: 'Jun', year: '2021' },
        instructor: 'Abdul Mannan',
        content: "Hi everyone, Apologize for the inconvenience but today’s class has been scheduled to Friday at 5:30 due to some unprecedented personal commitment. Hope to see you tomorrow. Take care",
        course: 'Physics'
      }, {
        createdAt: { date: '25', month: 'Jun', year: '2021' },
        instructor: 'Ahmad Shah',
        content: "Monthly Assessment will be on 2nd September. Topics are Quadratic Equations [ Solving them & Word problems] and Coordinate Geometry",
        course: 'Mathematics'
      }
    ]
  }

}
