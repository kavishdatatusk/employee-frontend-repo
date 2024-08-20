import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListWrapperComponent } from './employee-list-wrapper.component';

describe('EmployeeListWrapperComponent', () => {
  let component: EmployeeListWrapperComponent;
  let fixture: ComponentFixture<EmployeeListWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeListWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
