import { TestBed } from '@angular/core/testing';

import { UserExerciseService } from './user-exercise.service';

describe('UserExerciseService', () => {
  let service: UserExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
