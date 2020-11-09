import { TestBed } from '@angular/core/testing';

import { FitUserService } from './fit-user.service';

describe('FitUserService', () => {
  let service: FitUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
