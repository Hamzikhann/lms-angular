import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css'],
})
export class DashboardUserComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  chartOptions: any;

  constructor() {
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
}
