import { TestBed } from '@angular/core/testing';

import { UserTraningService } from './user-traning.service';

describe('UserTraningService', () => {
  let service: UserTraningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTraningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
