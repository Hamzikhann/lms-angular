import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any;

  constructor() { }

  ngOnInit(): void {
    this.notifications = [
      {
        createdAt: { date: '03', month: 'Oct', year: '2021', time: '5 hours ago' },
        instructor: 'Ahmad Shah',
        content: "Dear All, Welcome to our Mathematics class! We are so thrilled to have you on board and hope that this session will be very fruitful for you!",
        course: 'Mathematics',
        title: 'Orientation'
      },
      {
        createdAt: { date: '14', month: 'Sep', year: '2021', time: '1 day ago' },
        instructor: 'Muhammad Afzaal Khan',
        content: "Dear all students, due to some technical issue mam maria could not attend today's class",
        course: 'Urdu Second Language',
        title: 'Technical Issue'
      }, 
      {
        createdAt: { date: '23', month: 'Sep', year: '2021', time: '3 weeks and 1 days ago' },
        instructor: 'Entuition Team',
        content: "Dear Students, Please note physics classes have been shifted permanently to 7 40 p.m.- 8 30 p.m. (Monday, Tuesday, Wednesday and Thursday)",
        course: 'Physics',
        title: 'Session Timing Shifted'
      }, 
      {
        createdAt: { date: '09', month: 'Jun', year: '2021', time: '1 month ago' },
        instructor: 'Abdul Mannan',
        content: "Hi everyone, Apologize for the inconvenience but today’s class has been scheduled to Friday at 5:30",
        course: 'Physics',
        title: 'Class Resecheduled'
      }, {
        createdAt: { date: '25', month: 'Jun', year: '2021', time: '1 year ago' },
        instructor: 'Ahmad Shah',
        content: "Monthly Assessment will be on 2nd September.",
        course: 'Mathematics',
        title: 'Assessment'
      }
    ]
  }

}
