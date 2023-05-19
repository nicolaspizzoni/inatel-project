import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficTableHostComponent } from './traffic-table-host.component';

describe('TrafficTableHostComponent', () => {
  let component: TrafficTableHostComponent;
  let fixture: ComponentFixture<TrafficTableHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrafficTableHostComponent]
    });
    fixture = TestBed.createComponent(TrafficTableHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
