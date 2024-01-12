import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { SharedAutoCompleteComponent } from '@app/shared/modules/shared-auto-complete/shared-auto-complete.component';
import { SharedButtonComponent } from '@app/shared/modules/shared-button/shared-button.component';
import { SharedCheckBoxComponent } from '@app/shared/modules/shared-check-box/shared-check-box.component';
import { DatepickerComponent } from '@app/shared/modules/shared-datepicker/shared-datepicker.component';
import { SharedInputComponent } from '@app/shared/modules/shared-input/shared-input.component';
import { SharedRadioComponent } from '@app/shared/modules/shared-radio/shared-radio.component';
import { SharedSelectBoxComponent } from '@app/shared/modules/shared-select-box/shared-select-box.component';
import { SharedUploaderComponent } from '@app/shared/modules/shared-uploader/shared-uploader.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerComponent,
    SharedInputComponent,
    SharedRadioComponent,
    RxReactiveFormsModule,
    SharedButtonComponent,
    DashboardRoutingModule,
    SharedCheckBoxComponent,
    SharedUploaderComponent,
    SharedSelectBoxComponent,
    SharedAutoCompleteComponent,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
