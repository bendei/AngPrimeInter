import { TestBed } from '@angular/core/testing';

import { MenetvonalDatasourceService } from './menetvonal-datasource.service';

describe('MenetvonalDatasourceService', () => {
  let service: MenetvonalDatasourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenetvonalDatasourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
