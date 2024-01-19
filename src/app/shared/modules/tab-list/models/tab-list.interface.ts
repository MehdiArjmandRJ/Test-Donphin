import { ITabList } from "@app/modules/pages/home/models/home.interface";

export interface ITabListComponent {
    tabListData: ITabList[];
    componentActiveTab: any;
    initialActiveTabComponent(): void;
    changeTab(index: number): void;
}