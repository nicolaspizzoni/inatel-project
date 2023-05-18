import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { takeWhile, timer } from 'rxjs';
import { parseDownloadValue } from 'src/app/helpers/convertBytes';
import { TraficDataContent } from 'src/app/interfaces/traficData';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() chartId = '';
  public chart: any;
  @Input() mostTraffic: TraficDataContent[] = [];
  downloads: Array<number> | undefined;
  labels: Array<string> | undefined;
  alive: boolean = false;

  ngOnInit() {
    this.alive = true;

    timer(0, 8000)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        // Mover para dentro do timer do helper
        this.downloads = this.mostTraffic.map((obj: TraficDataContent) => {
          let number = parseDownloadValue(obj.download);
          return number;
        });

        this.labels = this.mostTraffic.map((obj: TraficDataContent) => {
          return obj.name;
        });

        let chartStatus = Chart.getChart(this.chartId);
        if (chartStatus != undefined) {
          chartStatus.destroy();
        }

        this.createChart();
      });
  }

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  createChart() {
    // mover new Chart para Home
    this.chart = new Chart(this.chartId, {
      type: 'pie', //informa o tipo do gráfico

      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Donwload',
            data: this.downloads,
            backgroundColor: [
              'red',
              'orange',
              'yellow',
              'green',
              'blue',
              'purple',
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
