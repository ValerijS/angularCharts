import { TestBed } from '@angular/core/testing';

import { InputDataService } from './input-data.service';

describe('InputDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputDataService = TestBed.get(InputDataService);
    expect(service).toBeTruthy();
  });
});
