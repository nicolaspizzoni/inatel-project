import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficTableProtocolComponent } from './traffic-table-protocol.component';

describe('TrafficTableProtocolComponent', () => {
  let component: TrafficTableProtocolComponent;
  let fixture: ComponentFixture<TrafficTableProtocolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrafficTableProtocolComponent]
    });
    fixture = TestBed.createComponent(TrafficTableProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
