import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeConfigurableComponent } from './type-configurable.component';

describe('TypeConfigurableComponent', () => {
  let component: TypeConfigurableComponent;
  let fixture: ComponentFixture<TypeConfigurableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeConfigurableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeConfigurableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
