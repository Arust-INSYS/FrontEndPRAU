import { TestBed } from '@angular/core/testing';

import { PeriodoAcService } from './periodo-ac.service';

describe('PeriodoAcService', () => {
  let service: PeriodoAcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodoAcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
