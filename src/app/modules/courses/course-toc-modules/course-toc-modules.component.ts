import { Component, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/users/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';
import { ToastrService } from 'ngx-toastr';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-course-toc-modules',
  templateUrl: './course-toc-modules.component.html',
  styleUrls: ['./course-toc-modules.component.css'],
})
export class CourseTocModulesComponent {
  loading: boolean = false;
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
  modules: any = [];
  enrollmentId: string = '';
  taskId: any;
  taskIdPrevious: any;
  taskIdNext: any;
  taskDetails: any;
  loggedInUser: any;

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
    taskTypeName: '',
    moduleId: '',
    reference: '',
  };
  taskFormType: string = '';

  editorModule: Editor = new Editor();
  editorTask: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  @ViewChild('closeModuleModal') closeModuleModal: ElementRef | undefined;
  @ViewChild('closeTaskModal') closeTaskModal: ElementRef | undefined;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private apiServices: ApiService,
    private courseTaskService: CourseTaskService,
    private route: ActivatedRoute
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
      this.courseTaskService.setModule([]);
      this.getTaskTypes();
    });

    this.route.paramMap.subscribe((data: any) => {
      this.taskId = data.params.taskId;
      this.courseTaskService.setTaskId(this.taskId);
    });

    this.courseTaskService.getTaskId().subscribe((data: any) => {
      this.taskId = data;
    });

    this.courseTaskService.getModules().subscribe((data: any) => {
      this.modules = data;
    });

    this.courseTaskService.getLoading().subscribe((data: any) => {
      this.loading = data;
    });
  }

  getCourseDetails() {
    const data = {
      path: 'courses/detail',
      payload: {
        courseId: this.courseId,
      },
    };

    this.apiServices.postRequest(data).subscribe((response) => {
      this.courseDetails = response;
      this.courseTaskService.setCourse(this.courseId, this.courseDetails);

      this.syllabus = {
        id: this.courseDetails.courseSyllabus?.id,
        title: this.courseDetails.courseSyllabus?.title,
      };
      this.getEnrollmentDetails();
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
      this.courseTaskService.setEnrollmentId(this.enrollmentId);
      this.courseTaskService.callModulesAPI();
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
      this.courseTaskService.callModulesAPI();

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
      this.courseTaskService.callModulesAPI();

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
      this.courseTaskService.callModulesAPI();

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
    payload.append('reference', this.task.reference);

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
      this.courseTaskService.callModulesAPI();

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
    payload.append('reference', this.task.reference);

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
      this.courseTaskService.callModulesAPI();

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
      this.courseTaskService.callModulesAPI();

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
      reference: task.reference,
    };
    this.setTaskType();
  }
  setTaskType() {
    this.taskTypes.forEach((type: any) => {
      if (type.id == this.task.taskTypeId) {
        this.task.taskTypeName = type.title;
      }
    });
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
      taskTypeName: '',
      moduleId: '',
      reference: '',
    };
  }

  // onHandoutSelected(event: any) {
  //   this.task.handout = event.target.files[0];
  // }

  onHandoutSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const fileNameParts = file.name.split('.');
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLowerCase();

      if (fileExtension === 'pdf') {
        this.task.handout = file;
      } else {
        event.target.value = null;
        this.toastr.error('Only PDF files are allowed!');
      }
    }
  }
}
