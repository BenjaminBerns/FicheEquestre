import { TestBed } from '@angular/core/testing';

import { JugesService } from './juges.service';

describe('JugesService', () => {
  let service: JugesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
