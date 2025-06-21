import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserTraningComponent } from './current-user-traning.component';

describe('CurrentUserTraningComponent', () => {
  let component: CurrentUserTraningComponent;
  let fixture: ComponentFixture<CurrentUserTraningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentUserTraningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserTraningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
