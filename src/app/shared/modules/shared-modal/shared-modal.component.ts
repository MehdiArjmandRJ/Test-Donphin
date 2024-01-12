import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.scss']
})
export class SharedModalComponent {
  @Input() component: any;
  @Output() closeModal: EventEmitter<null> = new EventEmitter<null>();
  onCloseModal() {}
}
