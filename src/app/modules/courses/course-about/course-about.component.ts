import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';

@Component({
  selector: 'app-course-about',
  templateUrl: './course-about.component.html',
  styleUrls: ['./course-about.component.css'],
})
export class CourseAboutComponent {
  permission: any = { create: true, update: true, delete: true };

  courseId: any;
  courseDetails: any;

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
  ImgBaseURL: string = this.config.ImgBaseURL;

  @ViewChild('closeObjectiveModal') closeObjectiveModal: ElementRef | undefined;
  @ViewChild('closeInstructorModal') closeInstructorModal:
    | ElementRef
    | undefined;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private config: ConfigService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseDetails();
  }

  getCourseDetails() {
    const data = {
      path: 'courses/detail',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.courseDetails = data;
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
