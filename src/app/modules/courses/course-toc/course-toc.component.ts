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

  enrollmentId: any;
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
    handout: '',
    taskTypeId: '',
    moduleId: '',
  };
  taskFormType: string = '';

  loading: boolean = false;

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
    this.loading = true;

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
      this.loading = false;

      if (this.loggedInUser.role.title == 'User') {
        this.getEnrollmentDetails();
      } else {
        this.getModules();
      }
    });
  }

  getEnrollmentDetails() {
    const data = {
      path: 'course/tasks/enrollment',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.enrollmentId = response.data?.id;
      this.getModules();
    });
  }

  getModules() {
    this.loading = true;

    var data: any = {
      path: 'course/modules/list',
      payload: {
        courseSyllabusId: this.syllabus.id,
      },
    };
    if (this.loggedInUser.role.title == 'User') {
      data.payload.courseEnrollmentId = this.enrollmentId;
    }
    this.apiServices.postRequest(data).subscribe((response) => {
      this.modules = response.data;
      const tasks: any = [];
      this.modules.forEach((module: any) => {
        module.courseTasks.forEach((task: any, key: any) => {
          task.progress =
            task.courseTaskProgresses?.length > 0
              ? task.courseTaskProgresses[0].percentage
              : '0';
          tasks.push(task);
        });
      });

      var taskTodo: any = tasks.length ? tasks[0] : null;

      tasks.forEach((task: any, key: any) => {
        task.index = key;

        if (task.progress == '100') {
          taskTodo = tasks[key + 1] ? tasks[key + 1] : null;
        }
      });

      if (this.loggedInUser.role.title == 'User') {
        for (let index = taskTodo.index + 1; index < tasks.length; index++) {
          tasks[index].disabled = true;
        }
      }
      this.loading = false;

      console.log(this.modules, tasks, taskTodo);
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
    });
  }
  createTask() {
    const payload = new FormData();
    payload.append('title', this.task.title);
    payload.append('estimatedTime', this.task.estimatedTime);
    payload.append('contentDescription', this.task.description);
    payload.append('contentVideoLink', this.task.videoLink);
    payload.append('courseTaskTypeId', this.task.taskTypeId);
    payload.append('courseModuleId', this.task.moduleId);
    if (this.task.handout) {
      payload.append('handout', this.task.handout);
    }

    const data = {
      path: 'course/tasks/create',
      payload: payload,
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
    const payload = new FormData();
    payload.append('courseTaskId', this.task.id);
    payload.append('title', this.task.title);
    payload.append('estimatedTime', this.task.estimatedTime);
    payload.append('contentDescription', this.task.description);
    payload.append('contentVideoLink', this.task.videoLink);
    payload.append('courseTaskTypeId', this.task.taskTypeId);
    if (this.task.handout) {
      payload.append('handout', this.task.handout);
    }

    const data = {
      path: 'course/tasks/update ',
      payload: payload,
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
      handout: task.courseTaskContent.handout,
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
      handout: '',
      taskTypeId: '',
      moduleId: '',
    };
  }

  onHandoutSelected(event: any) {
    this.task.handout = event.target.files[0];
  }
}
