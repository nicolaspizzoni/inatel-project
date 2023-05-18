import { Component, OnInit, OnDestroy } from '@angular/core';
import { TraficDataService } from 'src/app/services/trafic-data.service';
import { timer, takeWhile } from 'rxjs';
import { TraficDataContent } from 'src/app/interfaces/traficData';
import {
  getDownloadNumber,
  getUploadNumber,
} from 'src/app/helpers/convertBytes';
import { convertTrafficData } from 'src/app/helpers/convertTrafficData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  alive = false;
  traficData: TraficDataContent[] = [];
  chartData: TraficDataContent[] = [];
  totalDownload = 0;
  totalUpload = 0;

  constructor(private traficDataService: TraficDataService) {}

  ngOnInit(): void {
    this.alive = true;

    timer(0, 8000)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.traficDataService.getAll().subscribe((data) => {
          let results = convertTrafficData(data);

          this.traficData = results.combinedData;

          this.totalDownload = this.traficData.reduce(getDownloadNumber, 0);
          this.totalUpload = this.traficData.reduce(getUploadNumber, 0);

          this.chartData = this.traficData.slice(0, 5);
          this.chartData.push(results.othersDownloadObj);
        });
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
