import { TestBed, inject } from '@angular/core/testing';

import { InfoMockService } from './info-mock.service';

describe('InfoMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoMockService]
    });
  });

  it('should be created', inject([InfoMockService], (service: InfoMockService) => {
    expect(service).toBeTruthy();
  }));
});
