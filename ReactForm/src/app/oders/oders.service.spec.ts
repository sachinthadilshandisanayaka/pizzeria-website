import { TestBed } from '@angular/core/testing';

import { OdersService } from './oders.service';

describe('OdersService', () => {
  let service: OdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
