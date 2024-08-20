import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Employee } from '../employee';
import { MyServiceService } from '../../services/my-service.service';
import { isPlatformBrowser } from '@angular/common';
import { ICellRendererParams, CellValueChangedEvent } from 'ag-grid-community';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;

  title = "Employees";
  pagination = true;
  paginationPageSize = 5;

  rowData: Employee[] = [];

  colDefs: ColDef[] = [
    { 
      field: "firstname", 
      filter: true, 
      editable: true,
      width: 150
    },
    { 
      field: "lastname", 
      editable: true,
      width: 150
    },
    { 
      field: "email", 
      editable: true
    },
    { 
      field: "jobtitle", 
      editable: true,
      width: 150
    },
    { 
      field: "salary", 
      valueFormatter: p => "$" + p.value.toLocaleString(), 
      editable: true,
      width: 150
    },
    { 
      field: "department", 
      editable: true
    },
    {
      headerName: 'Actions',
      cellRenderer: (params: ICellRendererParams) => {
        const container = document.createElement('div');
        container.className = 'btn-container';
  
        const deleteBtn = document.createElement('button');
        deleteBtn.style.backgroundColor = '#007bff';
        deleteBtn.style.color = 'white';
        deleteBtn.style.borderRadius = '8px'; 
        deleteBtn.style.border = "none";
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => this.onDeleteEmployee(params));
  
        container.appendChild(deleteBtn);
  
        return container;
      },
      width: 100,
      suppressMenu: true
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    public employeeService: MyServiceService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeGrid();
    }
  }

  initializeGrid(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      employees => {
        this.employees = employees;
        this.rowData = employees;
        console.log(this.employees);
      },
      error => {
        console.error('Error fetching employees:', error);
        alert('Error fetching employees. Please try again later.');
      }
    );
  }

  onDeleteEmployee(params: any): void {
    const selectedEmail = params.data.email;
  
    if (confirm(`Are you sure you want to delete ${params.data.firstname} ${params.data.lastname}?`)) {
      this.employeeService.deleteUser(selectedEmail).subscribe(
        () => {
          this.getEmployees();
          alert('Employee deleted successfully.');
        },
        error => {
          console.error('Error deleting employee:', error);
          alert('Error deleting employee. Please try again later.');
        }
      );
    }
  }

  onCellValueChanged(params: CellValueChangedEvent): void {
    const updatedEmployee: Employee = params.data;
    this.employeeService.updateEmployee(updatedEmployee).subscribe(
      () => {
        console.log('Employee updated successfully');
      },
      error => {
        console.error('Error updating employee:', error);
        alert('Error updating employee. Please try again.');
        params.node.setDataValue(params.column.getColId(), params.oldValue);
      }
    );
  }

  exportToCsv(): void {
    this.employeeService.exportToCsv().subscribe(
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