import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExerciseInfoComponent } from './user-exercise-info.component';

describe('UserExerciseInfoComponent', () => {
  let component: UserExerciseInfoComponent;
  let fixture: ComponentFixture<UserExerciseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserExerciseInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExerciseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
