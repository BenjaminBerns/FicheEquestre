import { TestBed } from '@angular/core/testing';

import { CavaliersService } from './cavaliers.service';

describe('CavaliersService', () => {
  let service: CavaliersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CavaliersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
