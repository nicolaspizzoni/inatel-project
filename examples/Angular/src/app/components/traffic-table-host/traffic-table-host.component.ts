import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TrafficTableHostDataSource } from './traffic-table-host-datasource';
import { HostTrafic } from 'src/app/interfaces/traficData';

@Component({
  selector: 'app-traffic-table-host',
  templateUrl: './traffic-table-host.component.html',
  styleUrls: ['./traffic-table-host.component.scss']
})
export class TrafficTableHostComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<HostTrafic>;
  dataSource: TrafficTableHostDataSource;
  @Input() traffic: HostTrafic[] = []

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'host',
    'download',
    'upload',
  ];

  constructor() {
    this.dataSource = new TrafficTableHostDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.traffic;
    this.table.dataSource = this.dataSource;
  }
}
