import { Component } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';

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

  editor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
}
