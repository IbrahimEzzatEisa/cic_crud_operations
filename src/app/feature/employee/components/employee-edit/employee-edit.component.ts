import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  // form
  @ViewChild('form') form: NgForm;

  // main subscribe
  private subscription?: Subscription;

  // instace of main object
  employee_Obj: Employee = new Employee();

  // page load
  isLoader: boolean = false

  // inject
  constructor(
    private _employee_Service: EmployeeService,
    private route: Router,
    private route_active: ActivatedRoute,
    private cookie_Service: CookieService

  ) { }

  ngOnInit() {

    // get employee if from router
    this.employee_Obj.id = parseInt(this.route_active.snapshot.params.id);

    //call main function
    this.get_Employee(this.employee_Obj.id)
  }

  // get data of employee
  get_Employee(id) {
    this.isLoader = true
    this.subscription = this._employee_Service.get_Employee_By_Id(id).subscribe(
      (data) => {
        this.isLoader = false
        // Handle the retrieved data
        this.employee_Obj = data
        // Unsubscribe here
        this.subscription?.unsubscribe();
      },
      (error) => {
        // Handle any errors
        this.isLoader = false
      }
    );
  }

  // check of form is valid to edit
  onSubmit_edit() {
    if (this.form.valid) {
      this.update()
    }
  }

  // update employee
  update() {
    this.isLoader = true
    this._employee_Service.update_Employee(this.employee_Obj.id, this.employee_Obj).subscribe(
      (data) => {
        // Handle the retrieved data;
        this.employee_Obj = data
        this.isLoader = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Edit Employee has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      },
      (error) => {
        // Handle any errors
        this.isLoader = false

      })
  }

  // destroy subscription
  ngOnDestroy() {
    // Make sure to unsubscribe in the component's ngOnDestroy lifecycle hook
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logOut() {
    this.cookie_Service.delete('token_cic');
    this.route.navigate(['/auth/login']);

  }
  empolyee_list() {
    this.route.navigate([`/employee/list`]);

  }

}
