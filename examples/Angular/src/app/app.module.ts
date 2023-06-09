import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ChartPieComponent } from './components/chart-pie/chart-pie.component';
import { TrafficTableComponent } from './components/traffic-table/traffic-table.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HostsPageComponent } from './pages/hosts-page/hosts-page.component';
import { ProtocolComponent } from './pages/protocol/protocol.component';
import { BodyComponent } from './components/body/body.component';
import { HeaderCardsComponent } from './components/header-cards/header-cards.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChartPieHostComponent } from './components/chart-pie-host/chart-pie-host.component';
import { TrafficTableHostComponent } from './components/traffic-table-host/traffic-table-host.component';
import { ChartPieProtocolComponent } from './components/chart-pie-protocol/chart-pie-protocol.component';
import { TrafficTableProtocolComponent } from './components/traffic-table-protocol/traffic-table-protocol.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ChartPieComponent,
    TrafficTableComponent,
    SideNavComponent,
    HostsPageComponent,
    ProtocolComponent,
    BodyComponent,
    HeaderCardsComponent,
    ChartPieHostComponent,
    TrafficTableHostComponent,
    ChartPieProtocolComponent,
    TrafficTableProtocolComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
