import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-course-toc',
  templateUrl: './course-toc.component.html',
  styleUrls: ['./course-toc.component.css'],
})
export class CourseTocComponent {
  loggedInUser: any;
  permission: any = {
    module: { create: false, update: false, delete: false },
    task: { create: false, update: false, delete: false },
  };

  courseId: any;
  courseDetails: any;

  syllabus: any = {
    id: '',
    title: '',
  };

  modules: any;
  module: any = {
    id: '',
    title: '',
    description: '',
  };
  moduleFormType: string = '';

  taskTypes: any;
  tasks: any;
  task: any = {
    id: '',
    title: '',
    estimatedTime: '',
    description: '',
    videoLink: '',
    handoutLink: '',
    taskTypeId: '',
    moduleId: '',
  };
  taskFormType: string = '';

  @ViewChild('closeModuleModal') closeModuleModal: ElementRef | undefined;
  @ViewChild('closeTaskModal') closeTaskModal: ElementRef | undefined;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    if (this.loggedInUser.role.title == 'Administrator') {
      this.permission = {
        module: { create: true, update: true, delete: true },
        task: { create: true, update: true, delete: true },
      };
    }

    this.route.parent?.params.subscribe((params: any) => {
      this.courseId = params.id;
      this.getCourseDetails();
      this.getTaskTypes();
    });
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
      this.syllabus = {
        id: this.courseDetails.courseSyllabus?.id,
        title: this.courseDetails.courseSyllabus?.title,
      };
      this.getModules();
    });
  }

  getModules() {
    const data = {
      path: 'course/modules/list',
      payload: {
        courseSyllabusId: this.syllabus.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.modules = response.data;
      console.log(this.modules);
    });
  }
  createModule() {
    const data = {
      path: 'course/modules/create',
      payload: {
        courseSyllabusId: this.syllabus.id,
        title: this.module.title,
        description: this.module.description,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModuleModal) {
        this.closeModuleModal.nativeElement.click();
      }
      this.toastr.success('Module added successfully!');
      this.getModules();
      this.resetModuleData();
    });
  }
  updateModule() {
    const data = {
      path: 'course/modules/update',
      payload: {
        moduleId: this.module.id,
        title: this.module.title,
        description: this.module.description,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModuleModal) {
        this.closeModuleModal.nativeElement.click();
      }
      this.toastr.success('Module updated successfully!');
      this.getModules();
      this.resetModuleData();
    });
  }
  deleteModule() {
    const data = {
      path: 'course/modules/delete ',
      payload: {
        moduleId: this.module.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModuleModal) {
        this.closeModuleModal.nativeElement.click();
      }
      this.toastr.success('Module deleted successfully!');
      this.getModules();
      this.resetModuleData();
    });
  }
  setModule(module: any) {
    this.module = {
      id: module.id,
      title: module.title,
      description: module.description,
    };
  }
  setModuleFormType(name: string) {
    this.moduleFormType = name;
  }
  resetModuleData() {
    this.moduleFormType = 'create';
    this.module = {
      id: '',
      title: '',
      description: '',
    };
  }

  getTaskTypes() {
    const data = {
      path: 'course/tasks/list/types',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.taskTypes = data.data;
      console.log(this.taskTypes);
    });
  }
  createTask() {
    const data = {
      path: 'course/tasks/create',
      payload: {
        title: this.task.title,
        estimatedTime: this.task.estimatedTime,
        contentDescription: this.task.description,
        contentVideoLink: this.task.videoLink,
        contentHandoutLink: this.task.handoutLink,
        courseTaskTypeId: this.task.taskTypeId,
        courseModuleId: this.task.moduleId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeTaskModal) {
        this.closeTaskModal.nativeElement.click();
      }
      this.toastr.success('Task added successfully!');
      this.getModules();
      this.resetTaskData();
    });
  }
  updateTask() {
    const data = {
      path: 'course/tasks/update ',
      payload: {
        courseTaskId: this.task.id,
        title: this.task.title,
        estimatedTime: this.task.estimatedTime,
        contentDescription: this.task.description,
        contentVideoLink: this.task.videoLink,
        contentHandoutLink: this.task.handoutLink,
        courseTaskTypeId: this.task.taskTypeId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeTaskModal) {
        this.closeTaskModal.nativeElement.click();
      }
      this.toastr.success('Task updated successfully!');
      this.getModules();
      this.resetTaskData();
    });
  }
  deleteTask() {
    const data = {
      path: 'course/tasks/delete',
      payload: {
        courseTaskId: this.task.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeTaskModal) {
        this.closeTaskModal.nativeElement.click();
      }
      this.toastr.success('Task deleted successfully!');
      this.getModules();
      this.resetTaskData();
    });
  }
  setTaskModuleId(moduleId: string) {
    this.task.moduleId = moduleId;
  }
  setTask(task: any) {
    this.task = {
      id: task.id,
      title: task.title,
      estimatedTime: task.estimatedTime,
      description: task.courseTaskContent.description,
      videoLink: task.courseTaskContent.videoLink,
      handoutLink: task.courseTaskContent.handoutLink,
      taskTypeId: task.courseTaskTypeId,
      moduleId: task.courseModuleId,
    };
  }
  setTaskFormType(name: any) {
    this.taskFormType = name;
  }
  resetTaskData() {
    this.taskFormType = 'create';
    this.task = {
      id: '',
      title: '',
      estimatedTime: '',
      description: '',
      videoLink: '',
      handoutLink: '',
      taskTypeId: '',
      moduleId: '',
    };
  }
}
