import { Component, Inject, OnInit } from '@angular/core';
import { CarGridService } from '../../services/car-grid.service';
import { tableDataList } from '../../models/mock-data';
import { ITableList } from '../../models/home.interface';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { FormatterService } from '@app/shared/utils/formatter.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss'],
  providers: [CarGridService,FormatterService]

})
export class UnitsComponent implements OnInit {
  gridApi!: GridApi;
  searchValue!: string;
  entityCount: number = 0;
  rowsPerPage = [10, 25, 50, 100];
  carList: ITableList[] = tableDataList;
  dataList:ITableList[] = [];
  PageSize: number = 10;
  PageIndex: number = 1;
  constructor(@Inject('dataToPass') public dynamicData: any,
  public carGridService: CarGridService,
  ) { }

  ngOnInit() {
    this.onSearchInDataTable('')
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setDomLayout("autoHeight");
  }


  onSearchInDataTable(event:any): void {
    this.dataList= []
   this.carList.forEach((data:ITableList)=> data.unitTittle.includes(event) ? this.dataList.push(data): null)
  }

  onPageChange(event:any) {
    this.PageIndex = event.page + 1;
    this.PageSize = event.rows;
  }

}
