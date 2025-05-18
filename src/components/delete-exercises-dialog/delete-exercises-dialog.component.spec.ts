import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExercisesDialogComponent } from './delete-exercises-dialog.component';

describe('DeleteExercisesDialogComponent', () => {
  let component: DeleteExercisesDialogComponent;
  let fixture: ComponentFixture<DeleteExercisesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteExercisesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteExercisesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
