import { TestBed } from '@angular/core/testing';

import { TraficDataService } from './trafic-data.service';

describe('TraficDataService', () => {
  let service: TraficDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraficDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
