import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPieProtocolComponent } from './chart-pie-protocol.component';

describe('ChartPieProtocolComponent', () => {
  let component: ChartPieProtocolComponent;
  let fixture: ComponentFixture<ChartPieProtocolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartPieProtocolComponent]
    });
    fixture = TestBed.createComponent(ChartPieProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
