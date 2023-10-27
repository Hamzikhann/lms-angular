import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-learning-paths',
  templateUrl: './learning-paths.component.html',
  styleUrls: ['./learning-paths.component.css'],
})
export class LearningPathsComponent {
  learningPaths: any;
  selectedPath: any;
  classes: any;
  selectedClass: any;

  constructor(private toastr: ToastrService, private apiServices: ApiService) {}

  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  ngOnInit(): void {
    this.getLearningPaths();
  }

  getLearningPaths() {
    const data = {
      path: 'learning-paths/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.learningPaths = data.data;
      console.log(this.learningPaths);
    });
  }

  getClasses() {
    const data = {
      path: 'learning-paths/classes/list',
      payload: {
        learningPathId: this.selectedPath?.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((res) => {
      this.classes = res.data;
      console.log(this.classes);
    });
  }

  addLearningPath(path: any) {
    const data = {
      path: 'learning-paths/create',
      payload: {
        title: path.value.title,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      path.reset();
      this.toastr.success('User added successfully!');
      this.getLearningPaths();
    });
  }

  setLearningPath(obj: any) {
    this.selectedPath = obj;
    console.log(this.selectedPath);
  }

  deleteLearningPath() {
    const data = {
      path: 'learning-paths/delete',
      payload: {
        learningPathId: this.selectedPath.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.selectedPath = null;
      this.toastr.success('Learning path deleted successfully!');
      this.getLearningPaths();
    });
  }

  updateLearningPath(path: any) {
    const data = {
      path: 'learning-paths/update',
      payload: {
        learningPathId: this.selectedPath.id,
        title: path.value.title,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      path.reset();
      this.selectedPath = null;
      this.toastr.success('Learning path updated successfully!');
      this.getLearningPaths();
    });
  }

  addClass(obj: any) {
    const data = {
      path: 'learning-paths/classes/create',
      payload: {
        title: obj.value.title,
        learningPathId: this.selectedPath.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      obj.reset();
      this.toastr.success('Class added successfully!');
      this.getClasses();
      console.log(this.getClasses);
    });
  }

  setClass(obj: any) {
    this.selectedClass = obj;
    console.log(this.selectedClass);
  }

  deleteClass() {
    const data = {
      path: 'learning-paths/classes/delete',
      payload: {
        classId: this.selectedClass.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.selectedClass = null;
      this.toastr.success('Class deleted successfully!');
      this.getClasses();
    });
  }

  updateClass(obj: any) {
    const data = {
      path: 'learning-paths/classes/update',
      payload: {
        classId: this.selectedClass.id,
        title: obj.value.title,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      obj.reset();
      this.selectedClass = null;
      this.toastr.success('Class updated successfully!');
      this.getClasses();
    });
  }
}
