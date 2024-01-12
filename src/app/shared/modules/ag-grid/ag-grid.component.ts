import {Component, Input} from '@angular/core';
import {AgGridModule} from 'ag-grid-angular';
import {ColDef, GridOptions} from 'ag-grid-community';
import { NoRowOverlayComponent } from './components/no-item/no-item.component';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss'],
  standalone: true,
  imports: [
    AgGridModule,
  ]
})
export class AgGridComponent {
  @Input({required: true }) rows: unknown[] = [];
  @Input({required: true }) columns: ColDef[] = [];

  protected gridOptions: GridOptions = {
    defaultColDef: {
      sortable: false,
      flex: 0,
      suppressMovable: true,
    },
  };
  protected noRowsOverlayComponent: unknown = NoRowOverlayComponent;
}
