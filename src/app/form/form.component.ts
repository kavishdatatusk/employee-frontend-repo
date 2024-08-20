import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Employee } from '../employee';
import { FormsModule } from '@angular/forms';
import { MyServiceService } from '../../services/my-service.service';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  employee: Employee = {
    firstname: '',
    lastname: '',
    email: '',
    jobtitle: '',
    salary: '0.00',
    department: ''
  };

  constructor(private dialog: MatDialog, private MyServiceService: MyServiceService){ console.log('constructor'); }

  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '80%',
      maxWidth: '500px',
      panelClass: 'modal-content',
      autoFocus: false,
      data: { employee: this.employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.employee = result;
        this.addEmployee();
      }
    });
  }

  addEmployee() {
    console.log('Adding Employee:', this.employee);

    this.employee.salary = this.employee.salary.toString();

    this.MyServiceService.addUser(this.employee).subscribe(
      (response) => {
        console.log('Employee added successfully', response);
        this.resetForm();
      },
      (error) => {
        console.error('Error adding employee:', error);
      }
    );
  }

  resetForm() {
    this.employee = {
      firstname: '',
      lastname: '',
      email: '',
      jobtitle: '',
      salary: '0.00',
      department: ''
    };
  }

  delete() {
    const { email } = this.employee;

    if (!email) {
      console.log("Email not provided");
      return;
    }

    this.MyServiceService.deleteUser(email).subscribe(response => {
      console.log("Employee deleted successfully", response);
      this.resetForm();
    });
  }

  // New method for CSV export
  exportToCsv(): void {
    this.MyServiceService.exportToCsv().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'employees_export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading the file', error);
        alert('Error exporting CSV. Please try again later.');
      }
    );
  }
}