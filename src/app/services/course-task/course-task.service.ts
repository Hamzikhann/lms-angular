import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from '../../config/config.service';
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
  taskIdPrevious: string = '';
  taskIdNext: string = '';
  taskTodo: string = '';

  assessments: any;

  constructor(
    private apiServices: ApiService,
    private authService: AuthService
  ) {
    this.loggedInUser = JSON.parse(this.authService.getUser());

    this.modules = new BehaviorSubject<any>([]);
    this.taskDetails = new BehaviorSubject<any>(null);
    this.assessments = new BehaviorSubject<any>([]);
  }

  setCourse(id: string, data: any) {
    this.courseId = id;
    this.courseDetails = data;
  }

  getCourseId() {
    return this.courseId;
  }
  getCourseDetails() {
    return this.courseDetails;
  }

  setEnrollment(id: string) {
    this.enrollmentId = id;
  }
  getEnrollmentId() {
    return this.enrollmentId;
  }

  setTaskId(id: any) {
    this.taskId = id;
  }
  getTaskId() {
    return this.taskId;
  }
  setTaskDetails(data: any) {
    this.taskDetails.next(data);
  }
  getTaskDetails() {
    return this.taskDetails.asObservable();
  }
  setTaskIdPrevious(id: string) {
    this.taskIdPrevious = id;
  }
  getTaskIdPrevious() {
    return this.taskIdPrevious;
  }
  setTaskIdNext(id: string) {
    this.taskIdNext = id;
  }
  getTaskIdNext() {
    return this.taskIdNext;
  }
  callTaskDetailsAPI() {
    var data: any = {
      path: 'course/tasks/detail',
      payload: {
        courseTaskId: this.taskId,
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

      this.setTaskDetails(taskData);
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

        if (task.id == this.taskId) {
          const taskPreviousId = tasks[key - 1] ? tasks[key - 1].id : 0;
          this.setTaskIdPrevious(taskPreviousId);

          const taskNextId = tasks[key + 1] ? tasks[key + 1].id : 0;
          this.setTaskIdNext(taskNextId);
        }

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
  callAssessmentAPI() {
    const data = {
      path: 'course/task/assessments/list ',
      payload: {
        courseTaskId: this.taskId,
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
