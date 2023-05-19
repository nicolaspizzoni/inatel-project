import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { HostTrafic } from 'src/app/interfaces/traficData';
import { compare, getMultiplier } from 'src/app/helpers/convertBytes';

const EXAMPLE_DATA: HostTrafic[] = [];

/**
 * Data source for the TrafficTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TrafficTableHostDataSource extends DataSource<HostTrafic> {
  data: HostTrafic[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  transformDateToNumber(dateStr: string) {
    const parts = dateStr.split(/[/: ,]/);

    // Extrair cada parte da data
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Meses com zero
    const year = parseInt(parts[2], 10);
    const hours = parseInt(parts[3], 10);
    const minutes = parseInt(parts[4], 10);
    const seconds = parseInt(parts[5], 10);

    // Criando um novo obj de data
    const date = new Date(year, month, day, hours, minutes, seconds);

    // Pegando um número a partir da data
    return date.getTime();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<HostTrafic[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: HostTrafic[]): HostTrafic[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: HostTrafic[]): HostTrafic[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';

      let multiplierADown = getMultiplier(a.download.slice(-2).toUpperCase());
      let multiplierAUp = getMultiplier(a.upload.slice(-2).toUpperCase());
      let multiplierBDown = getMultiplier(b.download.slice(-2).toUpperCase());
      let multiplierBUp = getMultiplier(b.upload.slice(-2).toUpperCase());

      switch (this.sort?.active) {
        case 'name':
          return compare(a.host, b.host, isAsc);
        case 'download':
          return compare(
            parseFloat(a.download) * multiplierADown,
            parseFloat(b.download) * multiplierBDown,
            isAsc
          );
        case 'upload':
          return compare(
            parseFloat(a.upload) * multiplierAUp,
            parseFloat(b.upload) * multiplierBUp,
            isAsc
          );

        default:
          return 0;
      }
    });
  }
}

