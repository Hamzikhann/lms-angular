import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  ImgBaseURL: string = this.config.ImgBaseURL;
  showAllEnrollments = false;
  showAllAchievements = false;
  enrollments$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  achievements$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  courses: any;
  loggedInUser: any;
  loggedInUserRole: string = '';
  courseStats: any;
  courseEnrollmentId: any;
  chartOptions: any;
  series: any = [];

  @ViewChild('chart') chart: ChartComponent | undefined;
  courseEnrollments: any;
  coursesEnrolled: any;

  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiServices: ApiService,
    private config: ConfigService
  ) {
    this.chartOptions = {
      chart: {
        type: 'radialBar',
        width: 320,
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              fontSize: '20px',
            },
            total: {
              show: false,
            },
          },
          hollow: {
            margin: 12,
            size: '42%',
            background: 'transparent',
          },
          track: {
            show: true,
          },
        },
      },
      stroke: {
        lineCap: 'round',
      },
      series: [],
      labels: ['Tasks', 'Assessments'],
      legend: {
        show: true,
        position: 'right',
        offsetX: 30,
        offsetY: 82,
      },
    };
  }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    this.loggedInUserRole = this.loggedInUser.role.title;
    this.getCourseStatistics();
    this.getCourses();
  }

  getCourses() {
    this.loading = true;

    const data = {
      path: 'courses/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.courses = data;

      this.courses.forEach((course: any) => {
        if (course.tasks)
          course.progress = (course.tasks.completed / course.tasks.total) * 100;
      });
      this.loading = false;
    });
  }

  getCourseStatistics() {
    this.loading = true;
    const data = {
      path: 'dashboard',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.courseStats = response.data;
      console.log(this.courseStats);
      this.chartOptions.series = [
        this.courseStats.stats?.percentages?.task.toFixed(1),
        this.courseStats.stats?.percentages?.assessments.toFixed(1),
      ];

      if (
        this.courseStats.courses.enrolled &&
        this.courseStats.courses.enrolled.length
      )
        this.courseStats.courses.enrolled.forEach((element: any) => {
          element.createdAt = moment(element.createdAt).format('MM/DD/YYYY');
        });

      // if (
      //   this.courseStats?.achievements &&
      //   this.courseStats.achievements.length > 4
      // ) {
      //   this.courseStats.achievements = this.courseStats.achievements.slice(
      //     0,
      //     4
      //   );
      // }
      if (this.courseStats?.achievements)
        this.courseStats.achievements.forEach((element: any) => {
          element.createdAt = moment(element.createdAt).format('MM/DD/YYYY');
        });
      this.loading = false;
    });
  }

  resumeCourse(courseId: any, id: string) {
    const data = {
      path: 'course/tasks/due',
      payload: {
        courseEnrollmentId: id,
      },
    };
    this.apiServices.postRequest(data).subscribe((response: any) => {
      const taskId = response.data?.courseTask?.id;
      if (taskId) {
        this.router.navigate(['/courses', courseId, 'task', taskId]);
      }
    });
  }
}
