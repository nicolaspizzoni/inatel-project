import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPieHostComponent } from './chart-pie-host.component';

describe('ChartPieHostComponent', () => {
  let component: ChartPieHostComponent;
  let fixture: ComponentFixture<ChartPieHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartPieHostComponent]
    });
    fixture = TestBed.createComponent(ChartPieHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
