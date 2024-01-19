import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RxFormGroup, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { IconsModule } from '../custom-icons/icons.module';

@Component({
  selector: 'app-shared-input',
  templateUrl: './shared-input.component.html',
  styleUrls: ['./shared-input.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    FormsModule,
    IconsModule,
    CommonModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ],
})
export class SharedInputComponent   {
  private visiblePassword = false;

  @Input() label!:string;
  @Input() prefixIcon!:string;
  @Input() icon!:string;
  @Input() type!:string;
  @Input() placeHolder!:string;
  /**  @howToUse Using: use Reactive Forms */
  @Input() controlName!:string;
  @Input() controlForm!:RxFormGroup;
  /** @howToUse Using: use ngModel */
  @Input() showError!:boolean;
  @Input() errorMessage!:string;
  @Input() value!:string;

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  get getCheckType (){
    return this.type === 'password' ? true : false;
  }

  get getVisiblePassword (){
    return this.visiblePassword;
  }

  onChangeValue (event:any){
    this.value = event.target.value;
    this.valueChange.emit(event.target.value);
  }

  onClickToggleVisiblePassword (): void {
    this.visiblePassword = !this.visiblePassword;
  }

  onClearValue (){
    this.controlForm.controls[this.controlName].setValue(null);
  }

  getErrors (){
    const formControl : any = this.controlForm.controls[this.controlName];
    if (this.controlName) {
      return formControl['errorMessage'];
    } else {
      return null;
    }
  }

  checkErrors (){
    if (this.controlName) {
      return !this.controlForm.controls[this.controlName].valid && this.controlForm.controls[this.controlName].touched;
    } else {
      return null;
    }
  }

}
