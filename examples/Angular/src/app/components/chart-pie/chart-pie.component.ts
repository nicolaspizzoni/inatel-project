import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
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
  @Input() label = '';
  @Input() mostTraffic: TraficDataContent[] = [];
  @Output() changes = new EventEmitter();

  public chart: any;
  downloads: Array<number> | undefined;
  labels: Array<string> | undefined;
  alive = false;

  ngOnInit() {
    this.alive = true;
    this.refreshChart()
  }

  ngAfterViewInit() {
    this.createChart();
  }

  refreshChart(type?: string) {
    timer(500)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        if(type === 'upload') {
          this.downloads = this.mostTraffic.map((obj: TraficDataContent) => {
            let number = parseDownloadValue(obj.upload);
            return number;
          });
        }else if(type === 'download') {
          this.downloads = this.mostTraffic.map((obj: TraficDataContent) => {
            let number = parseDownloadValue(obj.download);
            return number;
          });
        }else {
          this.downloads = this.mostTraffic.map((obj: TraficDataContent) => {
            let numberDown = parseDownloadValue(obj.download)
            let numberUp = parseDownloadValue(obj.upload)
            let number = numberDown + numberUp
            return number;
          });
        }

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

  toggleDownUp(event: string) {
    this.changes.emit(event);
    this.refreshChart(event);
  }

  createChart() {
    this.chart = new Chart(this.chartId, {
      type: 'pie', //informa o tipo do gráfico

      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            data: this.downloads,
            backgroundColor: [
              'red',
              'orange',
              'yellow',
              'green',
              'blue',
              'purple',
            ],
            hoverOffset: 6,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
