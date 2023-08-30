import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from '../components/login/login/login.component';


const routes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  }
];

// export const EmployeeRoutes = RouterModule.forChild(routes);
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
