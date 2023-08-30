import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards';
import { ErrorInterceptor } from './Http/interceptors';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  imports: [
    CommonModule ,

  ],
  declarations: [

  ],
  providers: [
    AuthGuard,
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class CoreModule { }
