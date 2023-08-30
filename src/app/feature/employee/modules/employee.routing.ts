import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from '../components/employee-list/employee-list.component';
import { NgModule } from '@angular/core';
import { EmployeeEditComponent } from '../components/employee-edit/employee-edit.component';


const routes: Routes = [
  {
    path: '', component: EmployeeComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },

      { path: 'list', component: EmployeeListComponent },
      { path: 'edit/:id', component: EmployeeEditComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmployeeRoutingModule { }
