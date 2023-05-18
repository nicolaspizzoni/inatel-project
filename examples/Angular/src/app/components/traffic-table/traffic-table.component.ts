import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TrafficTableDataSource } from './traffic-table-datasource';
import { TraficDataContent } from 'src/app/interfaces/traficData';

@Component({
  selector: 'app-traffic-table',
  templateUrl: './traffic-table.component.html',
  styleUrls: ['./traffic-table.component.css']
})
export class TrafficTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TraficDataContent>;
  dataSource: TrafficTableDataSource;
  @Input() traffic: TraficDataContent[] = []

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'name',
    'download',
    'upload',
    'create_time',
    'last_time_update'
  ];

  constructor() {
    this.dataSource = new TrafficTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.traffic;
    this.table.dataSource = this.dataSource;
  }
}
