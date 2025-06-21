import { TestBed } from '@angular/core/testing';

import { UserTraningPracticeService } from './user-traning-practice.service';

describe('UserTraningPracticeService', () => {
  let service: UserTraningPracticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTraningPracticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
