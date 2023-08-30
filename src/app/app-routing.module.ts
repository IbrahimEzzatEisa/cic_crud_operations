import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: 'employee',
        pathMatch: 'full',
      },
     { path:'employee', loadChildren: () => import('./feature/employee/modules/employee.module').then(m => m.EmployeeModule),
     canActivate: [AuthGuard]
     },

  { path: 'auth', loadChildren: () => import('./auth/modules/auth.module').then(m => m.AuthModule),
  },
  { path: '**', redirectTo: 'employee' }


]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],

})
export class AppRoutingModule { }
