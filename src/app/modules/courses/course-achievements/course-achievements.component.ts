import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-course-achievements',
  templateUrl: './course-achievements.component.html',
  styleUrls: ['./course-achievements.component.css'],
})
export class CourseAchievementsComponent {
  courseId: any;
  courseAchievements: any;

  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private apiServices: ApiService,
    private config: ConfigService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params: any) => {
      this.courseId = params.id;
      this.getAchievements();
    });
  }

  getAchievements() {
    this.loading = true;
    const data = {
      path: 'course/achievements/list ',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.courseAchievements = response.data;
      this.courseAchievements.forEach((achievement: any) => {
        achievement.datetime = moment(achievement.createdAt).format(
          'MMM DD, YYYY hh:mm A'
        );
      });
      this.loading = false;
    });
  }
}
