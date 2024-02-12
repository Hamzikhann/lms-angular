import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  loggedInUser: any;
  loggedInUserRole: any;

  @ViewChild('chart') chart: ChartComponent | undefined;
  chartOptions: any;

  constructor(private authService: AuthService, private router: Router) {
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
            show: false,
          },
          startAngle: -180,
          endAngle: 180,
        },
      },
      stroke: {
        lineCap: 'round',
      },
      series: [71, 63],
      labels: ['Tasks', 'Assessments'],
      legend: {
        show: true,
        position: 'right',
        offsetX: 72,
        offsetY: 82,
      },
    };
  }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    this.loggedInUserRole = this.loggedInUser.role.title;
  }
}
