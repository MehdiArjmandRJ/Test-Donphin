import { Component, OnDestroy, OnInit } from '@angular/core';
import { IHomePage, ITableList, ITabList } from './models/home.interface';
import { tableDataList, tabListData } from './models/mock-data';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements IHomePage, OnInit, OnDestroy {
  tabList: ITabList[] = tabListData;
  tableListData: ITableList[] = tableDataList
  constructor() { }

  initialTabListData(): void {
    //get TabList Data From Api
  }

  initialTableListData(): void {
    //get TableList Data From Api
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
