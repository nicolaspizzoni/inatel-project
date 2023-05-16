import { Component, OnInit, OnDestroy } from '@angular/core';
import { TraficDataService } from 'src/app/services/trafic-data.service';
import { timer, takeWhile } from 'rxjs';
import { TraficDataContent } from 'src/app/interfaces/traficData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  alive: boolean = false;
  traficData: TraficDataContent[] = [];
  combinedData: TraficDataContent[] = [];
  totalDownload: number = 0;
  totalUpload: number = 0;

  constructor(private traficDataService: TraficDataService) {}

  getDownloadNumber(acc: number, item: any) {
    const trafic = item['download'];

    const measureUnits: { [key: string]: number } = {
      "KB": 1000,
      "MB": 1000000,
      "GB": 1000000000,
      "B": 1,
    };
    //validação se o trafic.slice retorna uma das chaves do measureUnits
    const multiplier: number =
      measureUnits[trafic.slice(-2)] ||
      measureUnits[trafic.slice(-1)];
    //retornando apenas o que dar match com 0123456789 da variavel trafic
    const number: string = trafic.match(/\d+/)![0];
    acc += parseInt(number) * multiplier;
    return acc;
  }

  getUploadNumber(acc: number, item: any) {
    const trafic = item['upload'];

    const measureUnits: { [key: string]: number } = {
      "KB": 1000,
      "MB": 1000000,
      "GB": 1000000000,
      "B": 1,
    };
    //validação se o trafic.slice retorna uma das chaves do measureUnits
    const multiplier: number =
      measureUnits[trafic.slice(-2)] ||
      measureUnits[trafic.slice(-1)];
    //retornando apenas o que dar match com 0123456789 da variavel trafic
    const number: string = trafic.match(/\d+/)![0];
    acc += parseInt(number) * multiplier;
    return acc;
  }

  parseDownloadValue(download: string): number {
    const numericValue = parseFloat(download);
    const unit = download.slice(-2).toUpperCase();
    const multiplier = this.getMultiplier(unit);
    return numericValue * multiplier;
  }

  convertBytesToString(bytes: number): string {
    if (bytes >= 1e9) {
      return (bytes / 1e9).toFixed(2) + "GB";
    } else if (bytes >= 1e6) {
      return (bytes / 1e6).toFixed(2) + "MB";
    } else if (bytes >= 1e3) {
      return (bytes / 1e3).toFixed(2) + "KB";
    } else {
      return bytes + "B";
    }
  }

  getMultiplier(unit: string): number {
    switch (unit) {
      case "KB":
        return 1e3;
      case "MB":
        return 1e6;
      case "GB":
        return 1e9;
      default:
        return 1;
    }
  }

  ngOnInit(): void {
    this.alive = true;

    timer(0, 5000)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.traficDataService.getAll().subscribe((data) => {
          data.forEach((traffic) => {
            const existingObject: TraficDataContent | undefined = this.combinedData.find(
              (item) => item.name === traffic.name
            );
            if (existingObject) {
              const existingValueInBytes = this.parseDownloadValue(
                existingObject.download
              );
              const currentValueInBytes = this.parseDownloadValue(traffic.download);
              existingObject.download = this.convertBytesToString(
                existingValueInBytes + currentValueInBytes
              );
            } else {
              this.combinedData.push({ ...traffic });
            }
          });
          this.traficData = this.combinedData;
          this.totalDownload = this.traficData.reduce(this.getDownloadNumber, 0);
          this.totalUpload = this.traficData.reduce(this.getUploadNumber, 0);
        });
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
