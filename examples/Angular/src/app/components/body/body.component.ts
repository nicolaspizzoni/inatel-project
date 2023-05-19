import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;


  getBodyClass(): string {
    let styLeClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styLeClass = 'body-trimmed'
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styLeClass = 'body-md-screen'
    }
    return styLeClass;

  }
}
