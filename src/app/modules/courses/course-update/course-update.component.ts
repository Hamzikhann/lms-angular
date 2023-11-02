import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css'],
})
export class CourseUpdateComponent {
  courseId: any;
  courseDetails: any;
  courseDepartments: any;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseDetails();
    this.getCourseDepartments();
  }

  editor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  getCourseDetails() {
    const data = {
      path: 'courses/detail',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.courseDetails = response;
      this.courseDetails.courseDepartmentId =
        this.courseDetails.courseDepartment.id;
    });
  }

  getCourseDepartments() {
    const data = {
      path: 'course/departments/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.courseDepartments = response.data;
      console.log(this.courseDepartments);
    });
  }

  updateCourse() {
    const data = {
      path: 'courses/update ',
      payload: {
        courseId: this.courseId,
        title: this.courseDetails.title,
        about: this.courseDetails.about,
        code: this.courseDetails.code,
        level: this.courseDetails.level,
        language: this.courseDetails.language,
        status: this.courseDetails.status,
        courseDepartmentId: this.courseDetails.courseDepartmentId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data: any) => {
      this.toastr.success('Course updated successfully!');
      this.router.navigate(['/courses', this.courseId]);
    });
  }
}
