import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.css']
})
export class AddEmployeeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // You can perform validation or additional processing here
    this.dialogRef.close(this.data.employee);
  }
}
