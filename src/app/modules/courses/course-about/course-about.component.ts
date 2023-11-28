import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-course-about',
  templateUrl: './course-about.component.html',
  styleUrls: ['./course-about.component.css'],
})
export class CourseAboutComponent {
  loggedInUser: any;
  permission: any = { create: false, update: false, delete: false };

  courseId: any;
  courseDetails: any;
  courseEnrollmentDetails: any;

  objective: any = {
    id: '',
    description: '',
  };
  objectiveFormType: string = '';

  instructor: any = {
    id: '',
    name: '',
    about: '',
    image: '',
  };
  instructorFormType: string = '';

  editorObjective: Editor = new Editor();
  editorInstructor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  ImgBaseURL: string = this.config.ImgBaseURL;

  loading: boolean = false;

  @ViewChild('closeObjectiveModal') closeObjectiveModal: ElementRef | undefined;
  @ViewChild('closeInstructorModal') closeInstructorModal:
    | ElementRef
    | undefined;
  @ViewChild('closeResetModal') closeResetModal: ElementRef | undefined;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private config: ConfigService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    if (this.loggedInUser.role.title == 'Administrator') {
      this.permission = { create: true, update: true, delete: true };
    }

    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseDetails();
  }

  getCourseDetails() {
    this.loading = true;

    const data = {
      path: 'courses/detail',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.courseDetails = data;

      if (this.loggedInUser.role.title == 'User') {
        if (
          this.courseDetails.courseAssignments.length > 0 &&
          this.courseDetails.courseAssignments[0].courseEnrollments.length > 0
        ) {
          this.courseEnrollmentDetails =
            this.courseDetails.courseAssignments[0].courseEnrollments[0];
          console.log(this.courseEnrollmentDetails);
        }
      }
      this.loading = false;
    });
  }

  resetCourseProgress() {
    const data = {
      path: 'course/enrollments/progress/reset ',
      payload: {
        courseEnrollmentId: this.courseEnrollmentDetails.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      if (this.closeResetModal) {
        this.closeResetModal.nativeElement.click();
      }
      this.toastr.success('Course progress reset successfully!');
      this.getCourseDetails();
    });
  }

  getObjectives() {
    const data = {
      path: 'course/objectives/list ',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.courseDetails.courseObjectives = response.data;
    });
  }
  createObjective() {
    const data = {
      path: 'course/objectives/create ',
      payload: {
        courseId: this.courseId,
        description: this.objective.description,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeObjectiveModal) {
        this.closeObjectiveModal.nativeElement.click();
      }
      this.toastr.success('Course objective added successfully!');
      this.getObjectives();
      this.resetObjectiveData();
    });
  }
  updateObjective() {
    const data = {
      path: 'course/objectives/update ',
      payload: {
        objectiveId: this.objective.id,
        description: this.objective.description,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeObjectiveModal) {
        this.closeObjectiveModal.nativeElement.click();
      }
      this.toastr.success('Course objective updated successfully!');
      this.getObjectives();
      this.resetObjectiveData();
    });
  }
  deleteObjective() {
    const data = {
      path: 'course/objectives/delete',
      payload: {
        objectiveId: this.objective.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeObjectiveModal) {
        this.closeObjectiveModal.nativeElement.click();
      }
      this.toastr.success('Course objective deleted successfully!');
      this.getObjectives();
      this.resetObjectiveData();
    });
  }
  setObjective(objective: any) {
    this.objective = {
      id: objective.id,
      description: objective.description,
    };
  }
  setObjectiveFormType(name: any) {
    this.objectiveFormType = name;
  }
  resetObjectiveData() {
    this.objectiveFormType = 'create';
    this.objective = {
      id: '',
      description: '',
    };
  }

  getInstructors() {
    const data = {
      path: 'course/instructors/list',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.courseDetails.courseInstructors = response.data;
    });
  }
  updateInstructor() {
    const payload = new FormData();
    payload.append('instructorId', this.instructor.id);
    payload.append('name', this.instructor.name);
    payload.append('about', this.instructor.about);
    if (this.instructor.image) {
      payload.append('image', this.instructor.image);
    }

    const data = {
      path: 'course/instructors/update',
      payload,
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeInstructorModal) {
        this.closeInstructorModal.nativeElement.click();
      }
      this.toastr.success('Instructor updated successfully!');
      this.getInstructors();
      this.resetObjectiveData();
    });
  }
  setInstructor(instructor: any) {
    this.instructor = {
      id: instructor.id,
      name: instructor.name,
      about: instructor.about,
      image: instructor.image,
    };
  }
  setInstructorFormType(name: any) {
    this.instructorFormType = name;
  }
  resetInstructorData() {
    this.instructorFormType = 'create';
    this.instructor = {
      id: '',
      name: '',
      about: '',
      image: '',
    };
  }
  onImageSelected(event: any) {
    this.instructor.image = event.target.files[0];
  }
}
