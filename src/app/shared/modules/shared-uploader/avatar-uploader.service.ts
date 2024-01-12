import {Injectable, signal} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AvatarUploaderService {
  public progressValue = signal(0);
  private resetInput = new Subject();

  public changeProgressValue (newValueProgress: number) {
    this.progressValue.set(newValueProgress);
  }

  public resetInputValue () {
    this.resetInput.next(true);
  }

  public get resetInputData () {
    return this.resetInput;
  }
}
