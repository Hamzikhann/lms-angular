import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Editor, Toolbar } from 'ngx-editor';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

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
  enrollmentId: any;
  enrollmentDetails: any;

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

  ImgBaseURL: string = this.config.ImgBaseURL;

  toolbar = this.config.toolbar;

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
    private authService: AuthService,
    private courseTaskService: CourseTaskService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    const userRole = this.loggedInUser.role.title;
    if (userRole == 'Administrator') {
      this.permission = { create: true, update: true, delete: true };
    }

    this.courseTaskService.getCourseId().subscribe((data: any) => {
      this.courseId = data;
    });

    this.courseTaskService.getCourseDetails().subscribe((data: any) => {
      this.courseDetails = data;
    });

    this.courseTaskService.getEnrollmentId().subscribe((data: any) => {
      this.enrollmentId = data;
    });

    this.courseTaskService.getEnrollmentDetails().subscribe((data: any) => {
      this.enrollmentDetails = data;
    });
  }

  resetCourseProgress() {
    const data = {
      path: 'course/enrollments/progress/reset',
      payload: {
        courseEnrollmentId: this.enrollmentId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      if (this.closeResetModal) {
        this.closeResetModal.nativeElement.click();
      }
      this.toastr.success('Course progress reset successfully!');
      this.getCourseEnrollmentDetails();
    });
  }

  getCourseEnrollmentDetails() {
    const data = {
      path: 'courses/enrollment/detail/',
      payload: {
        enrollmentId: this.enrollmentId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      const courseId = response.data.courseId;
      const courseDetails = response.data.course;
      const enrollmentDetails = response.data.enrollment;

      this.courseTaskService.setCourse(courseId, courseDetails);
      this.courseTaskService.setEnrollmentId(enrollmentDetails.id);
      this.courseTaskService.setEnrollmentDetails(enrollmentDetails);
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
  // onImageSelected(event: any) {
  //   this.instructor.image = event.target.files[0];
  // }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const fileNameParts = file.name.split('.');
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLowerCase();

      if (
        fileExtension === 'jpg' ||
        fileExtension === 'jpeg' ||
        fileExtension === 'png'
      ) {
        this.instructor.image = file;
      } else {
        event.target.value = null;
        this.toastr.error('Only JPEG and PNG files are allowed!');
      }
    }
  }
}
