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

  courseId: any = '';
  courseDetails: any;

  enrollmentId: any = '';
  enrollmentDetails: any = '';

  modules: any = [];

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

    this.courseId = new BehaviorSubject<any>('');
    this.courseDetails = new BehaviorSubject<any>(null);
    this.enrollmentId = new BehaviorSubject<any>('');
    this.enrollmentDetails = new BehaviorSubject<any>('');

    this.taskId = new BehaviorSubject<any>('');
    this.taskIdPrevious = new BehaviorSubject<any>('');
    this.taskIdNext = new BehaviorSubject<any>('');
    this.taskDetails = new BehaviorSubject<any>(null);
    this.modules = new BehaviorSubject<any>([]);
    this.assessments = new BehaviorSubject<any>([]);
    this.loading = new BehaviorSubject<any>(false);
  }
  private allowMarkAsCompleteSource = new BehaviorSubject<boolean>(false);
  currentAllowMarkAsComplete = this.allowMarkAsCompleteSource.asObservable();

  updateAllowMarkAsComplete(status: boolean) {
    this.allowMarkAsCompleteSource.next(status);
  }

  setCourse(id: string, data: any) {
    this.courseId.next(id);
    this.courseDetails.next(data);
  }
  getCourseId() {
    return this.courseId.asObservable();
  }
  getCourseDetails() {
    return this.courseDetails.asObservable();
  }
  setEnrollmentId(id: any) {
    this.enrollmentId.next(id);
  }
  setEnrollmentDetails(data: any) {
    this.enrollmentDetails.next(data);
  }
  getEnrollmentId() {
    return this.enrollmentId.asObservable();
  }
  getEnrollmentDetails() {
    return this.enrollmentDetails.asObservable();
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
  setLoading(type: boolean) {
    this.loading.next(type);
  }
  getLoading() {
    return this.loading.asObservable();
  }
  setModule(data: any) {
    this.modules.next(data);
  }
  getModules() {
    return this.modules.asObservable();
  }
  setAssessments(data: any) {
    this.assessments.next(data);
  }
  getAssessments() {
    return this.assessments.asObservable();
  }

  setPreviousNextTaskIds(currentTaskId: string) {
    this.taskIdPrevious.next(0);
    this.taskIdNext.next(0);

    this.getModules().subscribe((data: any) => {
      const modules = data;

      const tasks: any = [];
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

  callEnrollmentAPI(enrollmentId: string) {
    const data = {
      path: 'courses/enrollment/detail/',
      payload: {
        enrollmentId: enrollmentId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      const enrollmentDetails = response.data.enrollment;
      this.setEnrollmentDetails(enrollmentDetails);
    });
  }

  callModulesAPI(courseSyllabusId: string, enrollmentId: string) {
    this.setModule([]);
    var data: any = {
      path: 'course/modules/list',
      payload: {
        courseSyllabusId: courseSyllabusId,
      },
    };
    if (enrollmentId) {
      data.payload.courseEnrollmentId = enrollmentId;
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

  callTaskDetailsAPI(
    currentTaskId: string,
    courseId: string,
    enrollmentId: string
  ) {
    this.setLoading(true);
    this.setTaskDetails(null);
    var data: any = {
      path: 'course/tasks/detail',
      payload: {
        courseTaskId: currentTaskId,
      },
    };
    if (this.enrollmentId) {
      data.payload.courseId = courseId;
      data.payload.courseEnrollmentId = enrollmentId;
    }
    this.apiServices.postRequest(data).subscribe((response) => {
      var taskData = response.data;
      console.log(taskData);
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
