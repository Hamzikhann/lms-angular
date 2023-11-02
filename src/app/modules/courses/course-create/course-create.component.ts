import { Editor, Toolbar } from 'ngx-editor';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css'],
})
export class CourseCreateComponent {
  courses: any;
  course: any = {
    title: '',
    about: '',
    code: '',
    level: '',
    language: '',
    status: '',
    objectives: '',
    classId: '',
    courseDepartmentId: '',
    instructorName: '',
    instructorAbout: '',
  };

  learningPaths: any;
  courseDepartments: any;

  objectives: any = [];
  objective: any = {
    index: '',
    description: '',
  };
  objectiveFormType: string = 'create';

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private route: ActivatedRoute
  ) {}

  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  ngOnInit(): void {
    this.getCourseDepartments();
    this.getLearningPaths();
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

  createCourse() {
    const data = {
      path: 'courses/create',
      payload: {
        title: this.course.title,
        about: this.course.about,
        code: this.course.code,
        level: this.course.level,
        language: this.course.language,
        status: this.course.status,
        objectives: JSON.stringify(this.objectives),
        classId: this.course.classId,
        courseDepartmentId: this.course.courseDepartmentId,
        instructorName: this.course.instructorName,
        instructorAbout: this.course.instructorAbout,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Course added successfully!');
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

  getLearningPaths() {
    const data = {
      path: 'learning-paths/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.learningPaths = response.data;
      console.log(this.learningPaths);
    });
  }

  addCourseObjective() {
    if (this.objective.description) {
      this.objectives.push(this.objective.description);
    }
    this.resetCourseObjective();
  }

  updateCourseObjective() {
    if (this.objective.description) {
      this.objectives[this.objective.index] = this.objective.description;
    }
    this.resetCourseObjective();
  }

  deleteCourseObjective() {
    if (this.objective.index > -1) {
      this.objectives.splice(this.objective.index, 1);
    }
    this.resetCourseObjective();
  }

  setCourseObjective(objective: any, index: any) {
    this.objective = {
      index: index,
      description: objective,
    };
  }
  setCourseObjectiveFormType(name: string) {
    this.objectiveFormType = name;
  }
  resetCourseObjective() {
    this.objectiveFormType = 'create';
    this.objective = {
      index: '',
      description: '',
    };
  }
}
