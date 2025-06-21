import { TestBed } from '@angular/core/testing';

import { UserExercisePracticeService } from './user-exercise-practice.service';

describe('UserExercisePracticeService', () => {
  let service: UserExercisePracticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserExercisePracticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
