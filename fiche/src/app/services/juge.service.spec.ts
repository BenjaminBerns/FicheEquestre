import { TestBed } from '@angular/core/testing';

import { JugeService } from './juge.service';

describe('JugeService', () => {
  let service: JugeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
