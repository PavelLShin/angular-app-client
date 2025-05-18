import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExerciseSettingsComponent } from './user-exercise-settings.component';

describe('UserExerciseSettingsComponent', () => {
  let component: UserExerciseSettingsComponent;
  let fixture: ComponentFixture<UserExerciseSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserExerciseSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExerciseSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
