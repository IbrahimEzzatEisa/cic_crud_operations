import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from '../components/employee-list/employee-list.component';
import { RouterModule } from '@angular/router';
import {  EmployeeRoutingModule } from './employee.routing';
import { EmployeeService } from '../services/employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeEditComponent } from '../components/employee-edit/employee-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeEditComponent
  ],

  providers:[
    EmployeeService
  ]
})
export class EmployeeModule { }
