import { timer, takeWhile } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { TraficDataService } from 'src/app/services/trafic-data.service';
import { TraficDataContent } from 'src/app/interfaces/traficData';
import {
  compare,
  convertBytesToString,
  getDownloadNumber,
  getMultiplier,
  getUploadNumber,
  parseDownloadValue,
} from 'src/app/helpers/convertBytes';
import { convertTrafficData } from 'src/app/helpers/convertTrafficData';
import { HeaderCard } from 'src/app/interfaces/headerCard';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  alive = false;
  traficData: TraficDataContent[] = [];
  chartData: TraficDataContent[] = [];
  headerCardsData: HeaderCard[] | undefined;
  loading = true;
  checked = false;
  disabledReloadButton = false;

  totalOthersDownload = 0;
  totalOthersUpload = 0;
  toggleDownUp = 'todos';

  constructor(
    private traficDataService: TraficDataService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getTrafficData();
  }

  getToggle(event: string) {
    this.toggleDownUp = event;
    this.getChartData();
  }

  // getChartData faz o sort dos dados para retornar no chart processos com mais upload | mais download | mais da somatória
  getChartData() {
    let sortedData = this.traficData.slice().sort((a, b) => {
      let multiplierAUp = getMultiplier(a.upload.slice(-2).toUpperCase());
      let multiplierBUp = getMultiplier(b.upload.slice(-2).toUpperCase());
      let multiplierADown = getMultiplier(a.download.slice(-2).toUpperCase());
      let multiplierBDown = getMultiplier(b.download.slice(-2).toUpperCase());

      //verifica se o toggle de upload esta marcado e filtra por upload
      if (this.toggleDownUp == 'upload') {
        return compare(
          parseFloat(a.upload) * multiplierAUp,
          parseFloat(b.upload) * multiplierBUp,
          false
        );
      } else if (this.toggleDownUp == 'download') {
        //verifica se o toggle de download esta marcado e filtra por download

        return compare(
          parseFloat(a.download) * multiplierADown,
          parseFloat(b.download) * multiplierBDown,
          false
        );
      }

      // caso nenhum dos dois estiver marcado o de todos estará marcado e retornará a somatória de download e upload
      let totalUpDownA =
        parseFloat(a.download) * multiplierADown +
        parseFloat(a.upload) * multiplierAUp;
      let totalUpDownB =
        parseFloat(b.download) * multiplierBDown +
        parseFloat(b.upload) * multiplierBUp;

      return compare(totalUpDownA, totalUpDownB, false);
    });

    // pega os 5 do topo dos filtrados
    this.chartData = sortedData.slice(0, 5);

    // Somando download e upload a partir do 5º objeto para mostrar em 'Outros' no gráfico
    sortedData.slice(5).map((item) => {
      let parsedNumberDownload = parseDownloadValue(item.download);
      this.totalOthersDownload += parsedNumberDownload;
      let parsedNumberUpload = parseDownloadValue(item.upload);
      this.totalOthersUpload += parsedNumberUpload;
    });

    //Convertendo para string com a unidade de medida correta
    let totalDownOthersString = convertBytesToString(this.totalOthersDownload);
    let totalUpOthersString = convertBytesToString(this.totalOthersUpload);

    // adicionando o restante dos processos ao chartData para mostrar como 'Outros' no gráfico
    this.chartData.push({
      name: 'Outros',
      download: totalDownOthersString,
      upload: totalUpOthersString,
    });

    this.loading = false;
    this.cdRef.detectChanges();
  }

  toggleChange() {
    this.checked = !this.checked;
    this.disabledReloadButton = !this.disabledReloadButton;
    this.getTrafficData();
  }

  callTraficDataService() {

    this.traficDataService.getAll().subscribe((data) => {
      data.forEach((traffic, index) => {
        this.traficData = convertTrafficData(traffic, index);
      });

      let totalDownload = this.traficData.reduce(getDownloadNumber, 0);
      let totalUpload = this.traficData.reduce(getUploadNumber, 0);

      this.headerCardsData = [
        { title: 'Download', traffic: convertBytesToString(totalDownload) },
        { title: 'Upload', traffic: convertBytesToString(totalUpload) },
        {
          title: 'Total',
          traffic: convertBytesToString(totalDownload + totalUpload),
        },
      ];

      this.getChartData();

      this.loading = false;
      this.cdRef.detectChanges();
    });
  }

  getTrafficData() {
    this.traficData = [];

    this.loading = true;
    this.headerCardsData = undefined;

    if (this.checked) {
      this.alive = true;

      timer(0, 6000)
        .pipe(takeWhile(() => this.alive))
        .subscribe(() => {
          this.callTraficDataService();
        });
    } else {
      this.alive = false;
      this.callTraficDataService();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
