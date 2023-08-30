import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  // form
  @ViewChild('form') form: NgForm;

  // main subscribe
  private subscription?: Subscription;

  // main array of employee list
  employee_list: Employee[] = []

  // instace of main object
  employee_Obj: Employee = new Employee();

  // page load
  isLoader: boolean = false


  // inject
  constructor(
    private _employee_Service: EmployeeService,
    private route: Router,
    private cookie_Service: CookieService
  ) { }

  ngOnInit() {
    //call main function
    this.get_All_Employees()

  }

  // get data of employee
  get_All_Employees() {
    this.isLoader = true
    this.subscription = this._employee_Service.get_Employees_List().subscribe(
      (data) => {
        this.isLoader = false
        // Handle the retrieved data
        this.employee_list = data
        // Unsubscribe here
        this.subscription?.unsubscribe();
      },
      (error) => {
        // Handle any errors
        this.isLoader = false
      }
    );
  }

  // close modal
  close() {
    // rest form
    this.form.resetForm();
  }

  // check of form is valid add
  onSubmit() {
    if (this.form.valid) {
      this.addEmployee()
    }
  }

  // add new employee
  addEmployee() {
    this.isLoader = true
    this._employee_Service.add_Employee(this.form.value).subscribe(
      (response: Employee) => {
        this.isLoader = false
        // Handle the retrieved data
        this.employee_list.push(response);
        this.form.resetForm();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Add Employee has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      },
      (error) => {
        // Handle any errors
        this.isLoader = false
      })

  }

  // fill data modal
  fillEmployee(item: Employee) {
    // fill object from data of list;
    this.route.navigate([`/employee/edit/${item.id}`]);

  }

  // detete  employee
  deleteEmployee(employeeId, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoader = true
        this._employee_Service.delete_Employee(employeeId).subscribe(
          (data) => {
            // Handle the retrieved data
            this.employee_list.splice(index, 1);
            this.isLoader = false
            return this.employee_list;
          },
          (error) => {
            // Handle any errors
            this.isLoader = false
          })
      }
    })
  }

  // destroy subscription
  ngOnDestroy() {
    // Make sure to unsubscribe in the component's ngOnDestroy lifecycle hook
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // logOut
  logOut() {
    this.cookie_Service.delete('token_cic');
    this.route.navigate(['/auth/login']);
  }

}
