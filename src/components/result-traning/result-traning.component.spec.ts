import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTraningComponent } from './result-traning.component';

describe('ResultTraningComponent', () => {
  let component: ResultTraningComponent;
  let fixture: ComponentFixture<ResultTraningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultTraningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultTraningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
