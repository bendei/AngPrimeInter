import { TestBed } from '@angular/core/testing';

import { DepinjService } from './depinj.service';

describe('DepinjService', () => {
  let service: DepinjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepinjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
