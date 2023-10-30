import { Component } from '@angular/core';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css'],
})
export class CourseCreateComponent {
  objectives: any = [
    'Understand the fundamentals of CRM and its significance in modern business.',
    'Select and implement the right CRM software and tools for your organization.',
    'Effectively manage customer data and create actionable customer profiles.',
    'Develop and execute customer-centric marketing strategies.',
    'Improve sales processes and increase conversion rates.',
    'Enhance customer support and service delivery.',
  ];
}
