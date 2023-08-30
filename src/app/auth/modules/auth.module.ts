import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from '../components/login/login/login.component';
import { AuthRoutingModule } from './auth.routing';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  providers:[AuthService]

})
export class AuthModule { }
