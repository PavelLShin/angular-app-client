import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerTraningComponent } from './timer-traning.component';

describe('TimerTraningComponent', () => {
  let component: TimerTraningComponent;
  let fixture: ComponentFixture<TimerTraningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerTraningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerTraningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
