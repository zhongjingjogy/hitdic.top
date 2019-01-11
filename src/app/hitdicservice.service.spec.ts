import { TestBed } from '@angular/core/testing';

import { HitdicserviceService } from './hitdicservice.service';

describe('HitdicserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HitdicserviceService = TestBed.get(HitdicserviceService);
    expect(service).toBeTruthy();
  });
});
