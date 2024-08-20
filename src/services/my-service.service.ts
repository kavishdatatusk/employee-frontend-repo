import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../app/employee';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) { }

  // used during adding an employee
  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  // used during deletion of an employee
  deleteUser(email: string): Observable<any> {
    const deleteUrl = `${this.apiUrl}?email=${email}`;
    return this.http.delete<any>(deleteUrl);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // Update an employee
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.apiUrl, employee);
  }

  exportToCsv(): Observable<Blob> {
    return this.http.get('http://localhost:5000/api/export-csv', { responseType: 'blob' });
  }
}
