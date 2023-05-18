import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { TraficDataContent } from 'src/app/interfaces/traficData';

const EXAMPLE_DATA: TraficDataContent[] = [];

/**
 * Data source for the TrafficTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TrafficTableDataSource extends DataSource<TraficDataContent> {
  data: TraficDataContent[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TraficDataContent[]> {
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
  private getPagedData(data: TraficDataContent[]): TraficDataContent[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */

  getMultiplier(obj: TraficDataContent, type: string) {
    const multipliers: { [key: string]: number } = {
      "B": 1,
      "KB": 1000,
      "MB": 1000000,
      "GB": 1000000000,
    };
    if (type == 'download') {
      return (
        multipliers[obj.download.slice(-2)] ||
        multipliers[obj.download.slice(-1)]
      );
    }
    return (
      multipliers[obj.upload.slice(-2)] || multipliers[obj.upload.slice(-1)]
    );
  }

  private getSortedData(data: TraficDataContent[]): TraficDataContent[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';

      let multiplierADown = this.getMultiplier(a, 'download')
      let multiplierAUp = this.getMultiplier(a, 'upload')
      let multiplierBDown = this.getMultiplier(b, 'download')
      let multiplierBUp = this.getMultiplier(b, 'upload')

      switch (this.sort?.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'download':
          return compare((parseFloat(a.download) * multiplierADown), (parseFloat(b.download) * multiplierBDown), isAsc);
        case 'upload':
          return compare((parseFloat(a.upload) * multiplierAUp), (parseFloat(b.upload) * multiplierBUp), isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
