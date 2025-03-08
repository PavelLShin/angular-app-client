import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRegistrationDataComponent } from './change-registration-data.component';

describe('ChangeRegistrationDataComponent', () => {
  let component: ChangeRegistrationDataComponent;
  let fixture: ComponentFixture<ChangeRegistrationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeRegistrationDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRegistrationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
