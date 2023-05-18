import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostsPageComponent } from './hosts-page.component';

describe('HostsPageComponent', () => {
  let component: HostsPageComponent;
  let fixture: ComponentFixture<HostsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostsPageComponent]
    });
    fixture = TestBed.createComponent(HostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
