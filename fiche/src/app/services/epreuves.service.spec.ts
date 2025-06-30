import { TestBed } from '@angular/core/testing';

import { EpreuvesService } from './epreuves.service';

describe('EpreuvesService', () => {
  let service: EpreuvesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpreuvesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
