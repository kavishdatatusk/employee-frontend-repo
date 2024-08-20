import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEditPopupComponent } from './employee-edit-popup.component';

describe('EmployeeEditPopupComponent', () => {
  let component: EmployeeEditPopupComponent;
  let fixture: ComponentFixture<EmployeeEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeEditPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
