import { Component } from '@angular/core';

import Chart from 'chart.js/auto';
import { ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent {
  public chart: any;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels = ['Red', 'Blue', 'Yellow'];
  public pieChartData = [40, 30, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
}
