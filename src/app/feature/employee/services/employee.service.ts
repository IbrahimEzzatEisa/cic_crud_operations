import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Employee } from '../models/employee.model';

// END_POINTS of employee_API
const API_Url = END_POINTS.employee


@Injectable()

export class EmployeeService {

  // inject http
  constructor(private http: HttpClient) { }

  // get data all of employees
  get_Employees_List(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_Url).pipe(
      map((response) => {
        // Perform  data
        return response;
      })
    );
  }
  // get data of emplyee by id
  get_Employee_By_Id(id:number): Observable<Employee> {
    return this.http.get<Employee>(API_Url+`/${id}`).pipe(
      map((response) => {
        // Perform  data
        return response;
      })
    );
  }

  // add new employee
  add_Employee(model: Employee): Observable<Employee> {
    return this.http.post<Employee>(API_Url, model).pipe(
      map((response) => {
        // Perform  data
        return response;
      })
    );
  }

  // update  employee
  update_Employee(id: number, model: Employee): Observable<Employee> {
    return this.http.put<Employee>(API_Url + `/${id}`, model).pipe(
      map((response) => {
        // Perform  data
        return response;
      })
    );
  }

  // delete  employee
  delete_Employee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(API_Url + `/${id}`).pipe(
      map((response) => {
        // Perform  data
        return response;
      })
    );
  }


}
