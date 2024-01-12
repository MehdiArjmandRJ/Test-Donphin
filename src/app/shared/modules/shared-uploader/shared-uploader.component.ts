import {Subscription, tap} from 'rxjs';
import {CommonModule} from '@angular/common';
import {Component, Input, Output, EventEmitter, ElementRef, ViewChild, effect, OnDestroy} from '@angular/core';

import {AvatarUploaderService} from './avatar-uploader.service';
import {UploaderDataInterface} from '@app/shared/models/general.interface';

@Component({
  selector: 'app-shared-uploader',
  templateUrl: './shared-uploader.component.html',
  styleUrls: ['./shared-uploader.component.scss'],
  standalone: true,
  imports: [CommonModule],

})
export class SharedUploaderComponent implements OnDestroy  {
  unSubscriber = new Subscription();
  newlyInitial = true;

  @Input() progress!: number;
  @Input() prevAvatar!: string | ArrayBuffer;
  @Input() circumference!: number;

  @Output() onUploadFile = new EventEmitter<UploaderDataInterface>();
  @Output() onErrorMessage = new EventEmitter<string>();

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor (
    private elementRef: ElementRef,
    private avatarUploaderService: AvatarUploaderService
  ) {
    this.checkNewUpload();
    this.resetInput();
  }

  uploadFile (event:any) {
    try {
      const file: File = event.target.files[0];
      if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/gif' &&
        file.type !== 'image/bmp'
      ) {
        const errorMessage = 'فرمت های مورد قبول : png, jpg,gif,bmp می باشد.';
        this.onErrorMessage.emit(errorMessage);
      } else if (file.size > 1024 * 1024 * 5) {
        const errorMessage = 'حداکثر مقدار بارگزاری تصویر 5 مگابایت میباشد.';
        this.onErrorMessage.emit(errorMessage);
      } else {
        this.onErrorMessage.emit('');
        const readerDataUrl: FileReader = new FileReader();
        let newValueAvatar: string | ArrayBuffer;
        readerDataUrl.readAsDataURL(file);
        readerDataUrl.onload = () => {
          const avatarPrev = readerDataUrl.result;
          newValueAvatar = avatarPrev
            ? avatarPrev
            : 'assets/icons/account-management/background-avatar.svg';
          this.setProgress(NaN, true);
          this.onUploadFile.emit({file: file, avatarPrev: newValueAvatar});
        };
      }
    } catch (error) {}
  }

  setProgress (newProgressValue = NaN, newlyInitial = false) {
    const circle = this.elementRef.nativeElement.querySelector('#progress'),
      radius = circle.r.baseVal.value,
      circumference = radius * 2 * Math.PI;
    if (!newlyInitial) {
      this.progress = circumference - (newProgressValue / 100) * circumference;
      circle.style.strokeDashoffset = this.progress;
      circle.style.strokeDasharray = `${circumference * 2} ${
        circumference * 2
      }`;
    } else {
      circle.style.strokeDasharray = `${circumference * 2} ${
        circumference * 2
      }`;
      circle.style.strokeDashoffset = `1044`;
    }
  }

  checkNewUpload () {
    effect(() => {
      if (this.newlyInitial) {
        this.setProgress(
          this.avatarUploaderService.progressValue(),
          this.newlyInitial
        );
        this.newlyInitial = false;
      } else {
        this.setProgress(
          this.avatarUploaderService.progressValue(),
          this.newlyInitial
        );
      }
    });
  }

  resetInput () {
    this.unSubscriber = this.avatarUploaderService.resetInputData.pipe(tap({
      next: () => {
        this.fileInput.nativeElement.value = '';
        this.setProgress(1044, true);
      }
    })).subscribe();
  }

  ngOnDestroy (): void {
    this.unSubscriber.unsubscribe();
  }
}
