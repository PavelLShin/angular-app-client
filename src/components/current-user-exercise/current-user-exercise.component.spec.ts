import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserExerciseComponent } from './current-user-exercise.component';

describe('CurrentUserExerciseComponent', () => {
  let component: CurrentUserExerciseComponent;
  let fixture: ComponentFixture<CurrentUserExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentUserExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
