import { Injectable } from '@angular/core';

import { ColDef, GridOptions, ValueFormatterParams } from 'ag-grid-community';

import { FormatterService } from '@app/shared/utils/formatter.service';

import { NoRowOverlayComponent } from '@app/shared/modules/no-item/no-item.component';
import { ITableList } from '../models/home.interface';

@Injectable()
export class CarGridService {
  pinnedBottomRowData: ITableList[] = [];

  constructor(private formatter: FormatterService) {}

  gridOptions: GridOptions = {
    defaultColDef: {
      sortable: false,
      flex: 0,
      suppressMovable: true
    }
  };

  columns: ColDef[] = [
    {
      headerName: 'Unit Icon',
      flex: 1,
      field: 'icon',
      valueFormatter: this.statusNumberToTitle,
    },
    {
      headerName: 'Unit Title',
      flex: 1,
      field: 'unitTittle',
    },
    {
      headerName: 'Conected Status',
      flex: 1,
      field: 'connectStatus',
    },
    {
      headerName: 'IMEI',
      flex: 1,
      field: 'IMEI',
      cellStyle: this.formatter.numberColor
    },
    {
      headerName: 'Tags',
      flex: 1,
      field: 'Tags',
    },
    {
      headerName: 'Last Time Point',
      flex: 1,
      field: 'LastTimePoint',
    },
    {
      headerName: '',
      flex: 1,
      field: 'more',
    }
  ];
  noRowsOverlayComponent = NoRowOverlayComponent;

  statusNumberToTitle(params: ValueFormatterParams) {
    if (Number.isInteger(params.value)) {
      const key = Number(params.value);
      let title = '';

      if (key.toString().startsWith('1')) {
        title = 'واریز';
      } else if (key.toString().startsWith('2')) {
        title = 'خرید';
      } else if (key.toString().startsWith('3')) {
        title = 'فروش';
      } else if (key.toString().startsWith('4')) {
        title = 'دریافت';
      }
      return title;
    }

    return params.value;
  }

}
