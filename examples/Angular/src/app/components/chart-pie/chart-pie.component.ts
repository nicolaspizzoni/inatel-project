import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent implements OnInit {
  public chart: any;

  ngOnInit() {
    this.createChart()
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'pie', //informa o tipo do gráfico

      data: {
        labels: ['Red', 'Pink', 'Green', 'Yellow', 'Orange', 'Blue'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 240, 100, 432, 253, 34],
            backgroundColor: [
              'red',
              'pink',
              'green',
              'yellow',
              'orange',
              'blue',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
