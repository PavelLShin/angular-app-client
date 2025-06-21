import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartUserTraningComponent } from './start-user-traning.component';

describe('StartUserTraningComponent', () => {
  let component: StartUserTraningComponent;
  let fixture: ComponentFixture<StartUserTraningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartUserTraningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartUserTraningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
