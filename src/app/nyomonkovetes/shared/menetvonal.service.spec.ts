import { TestBed } from '@angular/core/testing';

import { MenetvonalService } from './menetvonal.service';

describe('MenetvonalService', () => {
  let service: MenetvonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenetvonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
