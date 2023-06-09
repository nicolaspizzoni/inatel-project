import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {

    // Connect to each port
    // Para utilizar o traffic_analyzer_v2.py com esse exemplo, remova os números 50001 e 50002 do array abaixo:
    // const ports = [
    //   50000,
    //   50001,
    //   50002
    // ];
    this.createSocketConnection(50000);
  }

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: any): void
  {
    console.log("data",data)
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  createSocketConnection(port: number) {
    const socket = io('http://localhost:50000');

    socket.on("connect", () => {
      console.log(`Connected to localhost:${port}`);
      // You can send data through the socket here
      socket.emit('message', `Hello from port ${port}`);
    });

    socket.on('trafficData', (data: any) => {
      console.log(JSON.stringify(data, null, 2));
      // Handle received data
    });

    socket.on('data', (data: any) => {
      console.log(JSON.stringify(data, null, 2));
      // Handle received data
    });

    socket.on('disconnect', () => {
      console.log(`Connection closed on localhost:${port}`);
    });

    socket.on('error', (err: any) => {
      console.error(`Socket error on localhost:${port}:`, err);
    });
  }
}
