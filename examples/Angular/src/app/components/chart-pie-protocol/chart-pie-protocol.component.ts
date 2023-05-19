import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { takeWhile, timer } from 'rxjs';
import { parseDownloadValue } from 'src/app/helpers/convertBytes';
import { ProtocolTrafic } from 'src/app/interfaces/traficData';

@Component({
  selector: 'app-chart-pie-protocol',
  templateUrl: './chart-pie-protocol.component.html',
  styleUrls: ['./chart-pie-protocol.component.scss'],
})
export class ChartPieProtocolComponent implements AfterViewInit, OnDestroy {
  @Input() chartId = '';
  @Input() label = '';
  @Input() mostTraffic: ProtocolTrafic[] = [];
  @Output() changes = new EventEmitter();
  @Input() autoRefresh = false;

  public chart: any;
  downloads: Array<number> | undefined;
  labels: Array<string> | undefined;
  alive = false;
  aliveRefresh = false;
  selectedType = '';

  ngAfterViewInit() {
    this.initChart();
  }

  initChart() {
    if (this.autoRefresh) {
      this.aliveRefresh = true;
      this.alive = false;

      timer(0, 6500)
        .pipe(takeWhile(() => this.aliveRefresh))
        .subscribe(() => {
          this.refreshChart(this.selectedType);
        });
    } else {
      this.alive = true;
      this.aliveRefresh = false;

      timer(500)
        .pipe(takeWhile(() => this.alive))
        .subscribe(() => {
          this.refreshChart(this.selectedType);
        });
    }
  }

  refreshChart(type?: string) {
    if (type === 'upload') {
      this.downloads = this.mostTraffic.map((obj: ProtocolTrafic) => {
        let number = parseDownloadValue(obj.upload);
        return number;
      });
    } else if (type === 'download') {
      this.downloads = this.mostTraffic.map((obj: ProtocolTrafic) => {
        let number = parseDownloadValue(obj.download);
        return number;
      });
    } else {
      this.downloads = this.mostTraffic.map((obj: ProtocolTrafic) => {
        let numberDown = parseDownloadValue(obj.download);
        let numberUp = parseDownloadValue(obj.upload);
        let number = numberDown + numberUp;
        return number;
      });
    }

    this.labels = this.mostTraffic.map((obj: ProtocolTrafic) => {
      return obj.protocol;
    });

    let chartStatus = Chart.getChart(this.chartId);
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    this.createChart();
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
        aspectRatio: 1,
      },
    });
  }

  ngOnDestroy() {
    this.alive = false;
    this.aliveRefresh = false;
  }
}
