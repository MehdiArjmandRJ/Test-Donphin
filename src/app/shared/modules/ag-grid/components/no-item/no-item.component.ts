import {Component} from '@angular/core';
import {INoRowsOverlayParams} from 'ag-grid-community';

@Component({
  selector: 'app-no-item',
  templateUrl: './no-item.component.html',
  styleUrls: ['./no-item.component.scss']
})
export class NoRowOverlayComponent {

  agInit (params: INoRowsOverlayParams): void {
  }

}
