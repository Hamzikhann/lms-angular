import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-learning-paths',
  templateUrl: './learning-paths.component.html',
  styleUrls: ['./learning-paths.component.css'],
})
export class LearningPathsComponent {
  classes: any;
  class: any = {
    id: '',
    title: '',
  };
  classFormType: string = 'create';

  learningPaths: any;
  learningPath: any = {
    id: '',
    title: '',
  };
  learningPathFormType: string = 'create';
  loggedInUser: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiServices: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    if (this.loggedInUser.role.title != 'Administrator') {
      this.router.navigate(['/']);
    } else {
      this.getLearningPaths();
    }
  }

  getLearningPaths() {
    this.learningPaths = [];
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
    this.classes = [];
    const data = {
      path: 'learning-paths/classes/list',
      payload: {
        learningPathId: this.learningPath.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((res) => {
      this.classes = res.data;
      console.log(this.classes);
    });
  }

  addLearningPath() {
    const data = {
      path: 'learning-paths/create',
      payload: {
        title: this.learningPath.title,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Learning path added successfully!');
      this.resetLearningPathData();
      this.getLearningPaths();
    });
  }

  updateLearningPath() {
    const data = {
      path: 'learning-paths/update',
      payload: {
        learningPathId: this.learningPath.id,
        title: this.learningPath.title,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Learning path updated successfully!');
      this.resetLearningPathData();
      this.getLearningPaths();
    });
  }

  deleteLearningPath() {
    const data = {
      path: 'learning-paths/delete',
      payload: {
        learningPathId: this.learningPath.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Learning path deleted successfully!');
      this.resetLearningPathData();
      this.getLearningPaths();
    });
  }

  setLearningPath(obj: any) {
    this.learningPath = {
      id: obj.id,
      title: obj.title,
    };
  }

  setlearningPathFormType(name: string) {
    this.learningPathFormType = name;
  }

  resetLearningPathData() {
    this.learningPathFormType = 'create';
    this.learningPath = {
      id: '',
      title: '',
    };
  }

  addClass() {
    const data = {
      path: 'learning-paths/classes/create',
      payload: {
        title: this.class.title,
        learningPathId: this.learningPath.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Class added successfully!');
      this.resetClassData();
      this.getLearningPaths();
    });
  }

  updateClass() {
    const data = {
      path: 'learning-paths/classes/update',
      payload: {
        classId: this.class.id,
        title: this.class.title,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Class updated successfully!');
      this.resetClassData();
      this.getLearningPaths();
    });
  }

  deleteClass() {
    const data = {
      path: 'learning-paths/classes/delete',
      payload: {
        classId: this.class.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Class deleted successfully!');
      this.resetClassData();
      this.getLearningPaths();
    });
  }

  setClass(obj: any) {
    this.class = {
      id: obj.id,
      title: obj.title,
    };
  }

  setClassFormType(name: string) {
    this.classFormType = name;
  }

  resetClassData() {
    this.class = {
      id: '',
      title: '',
    };
  }
}
