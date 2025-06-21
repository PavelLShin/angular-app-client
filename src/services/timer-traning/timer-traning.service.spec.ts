import { TestBed } from '@angular/core/testing';

import { TimerTraningService } from './timer-traning.service';

describe('TimerTraningService', () => {
  let service: TimerTraningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerTraningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
