export interface ITabList {
  title: string;
  active: boolean;
  component: any;
}

export interface ITableList {
  icon: string;
  unitTittle: string;
  connectStatus: string;
  IMEI: string;
  Tags: string;
  LastTimePoint: string;
}

export interface IHomePage {
  tabList: ITabList[];
  tableListData: ITableList[];
  initialTabListData(): void;
  initialTableListData(): void;
}