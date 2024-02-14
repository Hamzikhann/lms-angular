import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { ApiService } from '../users/api.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CourseTaskService {
  loggedInUser: any;

  courseId: string = '';
  courseDetails: any;

  modules: any;

  enrollmentId: string = '';

  taskId: any = '';
  taskDetails: any;
  taskIdPrevious: any = '';
  taskIdNext: any = '';
  taskTodo: string = '';

  assessments: any;

  loading: any = false;

  constructor(
    private apiServices: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loggedInUser = JSON.parse(this.authService.getUser());

    this.taskId = new BehaviorSubject<any>('');
    this.taskIdPrevious = new BehaviorSubject<any>('');
    this.taskIdNext = new BehaviorSubject<any>('');
    this.taskDetails = new BehaviorSubject<any>(null);
    this.modules = new BehaviorSubject<any>([]);
    this.assessments = new BehaviorSubject<any>([]);
    this.loading = new BehaviorSubject<any>(false);
  }

  setCourse(id: string, data: any) {
    this.courseId = id;
    this.courseDetails = data;
    // this.taskId = '';
    // this.taskIdPrevious = '';
    // this.taskIdNext = '';
    // this.taskDetails = null;
    // this.modules = [];
    // this.assessments = [];
  }
  getCourseId() {
    return this.courseId;
  }
  getCourseDetails() {
    return this.courseDetails;
  }

  setEnrollmentId(id: string) {
    this.enrollmentId = id;
  }
  getEnrollmentId() {
    return this.enrollmentId;
  }

  setTaskId(id: any) {
    this.taskId.next(id);
  }
  getTaskId() {
    return this.taskId.asObservable();
  }
  setTaskDetails(data: any) {
    this.taskDetails.next(data);
  }
  getTaskDetails() {
    return this.taskDetails.asObservable();
  }
  setTaskIdPrevious(id: string) {
    this.taskIdPrevious.next(id);
  }
  getTaskIdPrevious() {
    return this.taskIdPrevious.asObservable();
  }
  setTaskIdNext(id: string) {
    this.taskIdNext.next(id);
  }
  getTaskIdNext() {
    return this.taskIdNext.asObservable();
  }
  setPreviousNextTaskIds(currentTaskId: string) {
    const tasks: any = [];

    this.getModules().subscribe((data: any) => {
      const modules = data;
      modules.forEach((module: any) => {
        module.courseTasks.forEach((task: any, key: any) => {
          tasks.push(task);
        });
      });

      tasks.forEach((task: any, key: any) => {
        if (task.id == currentTaskId) {
          const taskPreviousId = tasks[key - 1] ? tasks[key - 1].id : 0;
          this.setTaskIdPrevious(taskPreviousId);

          const taskNextId = tasks[key + 1] ? tasks[key + 1].id : 0;
          this.setTaskIdNext(taskNextId);
        }
      });
    });
  }

  setLoading(type: boolean) {
    this.loading.next(type);
  }
  getLoading() {
    return this.loading.asObservable();
  }

  callTaskDetailsAPI(currentTaskId: string) {
    this.setLoading(true);
    var data: any = {
      path: 'course/tasks/detail',
      payload: {
        courseTaskId: currentTaskId,
      },
    };
    if (this.loggedInUser.role.title == 'User') {
      data.payload.courseId = this.courseId;
      data.payload.courseEnrollmentId = this.enrollmentId;
    }
    this.apiServices.postRequest(data).subscribe((response) => {
      var taskData = response.data;
      if (taskData?.courseTaskProgresses.length > 0) {
        taskData.progress = taskData?.courseTaskProgresses[0].percentage;
      } else {
        taskData.progress = '0';
      }

      this.setLoading(false);
      this.setTaskDetails(taskData);
      this.setPreviousNextTaskIds(currentTaskId);
    });
  }

  setModule(data: any) {
    this.modules.next(data);
  }
  getModules() {
    return this.modules.asObservable();
  }
  callModulesAPI() {
    var data: any = {
      path: 'course/modules/list',
      payload: {
        courseSyllabusId: this.courseDetails.courseSyllabus.id,
      },
    };
    if (this.loggedInUser.role.title == 'User') {
      data.payload.courseEnrollmentId = this.enrollmentId;
    }
    this.apiServices.postRequest(data).subscribe((response) => {
      var modulesData = response.data;

      const tasks: any = [];
      modulesData.forEach((module: any) => {
        module.courseTasks.forEach((task: any, key: any) => {
          task.progress =
            task.courseTaskProgresses?.length > 0
              ? task.courseTaskProgresses[0].percentage
              : '0';
          tasks.push(task);
        });
      });
      this.setModule(modulesData);

      var taskTodo: any = tasks.length ? tasks[0] : null;
      tasks.forEach((task: any, key: any) => {
        task.index = key;
        if (task.progress != '0') {
          taskTodo = tasks[key + 1] ? tasks[key + 1] : null;
        }
      });
      if (this.loggedInUser.role.title == 'User' && taskTodo) {
        for (let index = taskTodo.index + 1; index < tasks.length; index++) {
          if (tasks[index]) {
            tasks[index].disabled = true;
          }
        }
      }
    });
  }

  setAssessments(data: any) {
    this.assessments.next(data);
  }
  getAssessments() {
    return this.assessments.asObservable();
  }
  callAssessmentAPI(currentTaskId: string) {
    const data = {
      path: 'course/task/assessments/list ',
      payload: {
        courseTaskId: currentTaskId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response: any) => {
      var assessmentsData = response.data;
      assessmentsData.forEach((assignment: any) => {
        assignment.courseTaskAssessmentQuestions.forEach((question: any) => {
          var options = question.options.split(',');
          question.options = this.shuffleAssessmentOptions(options);
        });
      });
      this.setAssessments(assessmentsData);
    });
  }
  shuffleAssessmentOptions(array: any) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
