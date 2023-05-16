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
  totalDownload: number = 0;
  totalUpload: number = 0;

  constructor(private traficDataService: TraficDataService) {}

  getDownloadNumber(acc: number, item: any) {
    const trafic = item['download']
    const multipliers: {[key: string]: number} = {"KB": 1000, "MB": 1000000, "GB": 1000000000, "B": 1}
    //validação se o trafic.slice retorna uma das chaves do multipliers
    const multiplier:number = multipliers[trafic.slice(-2)] || multipliers[trafic.slice(-1)]
    //retornando apenas o que dar match com 0123456789 da variavel trafic
    const number: string = trafic.match(/\d+/)![0]
    acc += parseInt(number) * multiplier;
    return acc
  }

  getUploadNumber(acc: number, item: any) {
    const trafic = item['upload']
    const multipliers: {[key: string]: number} = {"KB": 1000, "MB": 1000000, "GB": 1000000000, "B": 1}
    //validação se o trafic.slice retorna uma das chaves do multipliers
    const multiplier:number = multipliers[trafic.slice(-2)] || multipliers[trafic.slice(-1)]
    //retornando apenas o que dar match com 0123456789 da variavel trafic
    const number: string = trafic.match(/\d+/)![0]
    acc += parseInt(number) * multiplier;
    return acc
  }

  ngOnInit(): void {
    this.alive = true;

    timer(0, 5000)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.traficDataService.getAll().subscribe((data) => {
          this.traficData = data;
          this.totalDownload = data.reduce(this.getDownloadNumber, 0);
          this.totalUpload = data.reduce(this.getUploadNumber, 0);
        });
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
