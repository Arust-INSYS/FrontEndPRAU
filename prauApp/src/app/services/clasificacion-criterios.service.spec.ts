import { TestBed } from '@angular/core/testing';

import { ClasificacionCriteriosService } from './clasificacion-criterios.service';

describe('ClasificacionCriteriosService', () => {
  let service: ClasificacionCriteriosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasificacionCriteriosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
