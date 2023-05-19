import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCardsComponent } from './header-cards.component';

describe('HeaderCardsComponent', () => {
  let component: HeaderCardsComponent;
  let fixture: ComponentFixture<HeaderCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderCardsComponent]
    });
    fixture = TestBed.createComponent(HeaderCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
