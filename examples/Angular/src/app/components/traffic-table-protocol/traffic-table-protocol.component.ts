import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TrafficTableProtocolDataSource } from './traffic-table-protocol-datasource';
import { ProtocolTrafic } from 'src/app/interfaces/traficData';

@Component({
  selector: 'app-traffic-table-protocol',
  templateUrl: './traffic-table-protocol.component.html',
  styleUrls: ['./traffic-table-protocol.component.scss']
})
export class TrafficTableProtocolComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProtocolTrafic>;
  dataSource: TrafficTableProtocolDataSource;
  @Input() traffic: ProtocolTrafic[] = []

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'protocol',
    'download',
    'upload',
  ];

  constructor() {
    this.dataSource = new TrafficTableProtocolDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.traffic;
    this.table.dataSource = this.dataSource;
  }
}
