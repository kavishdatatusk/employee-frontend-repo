/*
**************************************************
// Page - Employee Edit Popup
// Author - Kavish Arora
// Documented on 7/2/2024
// Descripton - Popup display for editing employee
                info
**************************************************
*/
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-edit-popup',
  templateUrl: './employee-edit-popup.component.html',
  styleUrl: './employee-edit-popup.component.css'
})
export class EmployeeEditPopupComponent {
  @Input() employee: Employee | null = null;
  @Output() closePopup = new EventEmitter<void>();
  @Output() submitChanges = new EventEmitter<Employee>();

  // pass to different file
  onSubmit(): void {
    if (this.employee) {
      this.submitChanges.emit(this.employee);
    }
  }

  onClose(): void {
    this.closePopup.emit();
  }
}
