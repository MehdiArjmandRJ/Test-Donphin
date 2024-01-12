// Angular Import 
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Package Import
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

//My import
import { IconsModule, SharedButtonComponent, SharedInputComponent } from '@app/shared/modules';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SharedInputComponent,
    SharedButtonComponent,
    RxReactiveFormsModule,
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
