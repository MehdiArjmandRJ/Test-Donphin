import { CommonModule } from '@angular/common';
import { Component, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ITabList } from '@app/modules/pages/home/models/home.interface';
import { ITabListComponent } from './models/tab-list.interface';

@Component({
  selector: 'app-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TabListComponent implements ITabListComponent, OnInit {
  componentActiveTab: any;

  @Input() data: any;
  @Input() tabListData!: ITabList[];
  // dynamicDataContext: { $implicit: any } = { $implicit: null };

  @ViewChild('dynamicDataContext', { read: TemplateRef }) dynamicDataContext: any;

  constructor(
    private injector: Injector,
  ) { }

  ngOnInit() {
    this.initialActiveTabComponent();
    this.createInjectorData();
  }

  changeTab(index: number): void {
    this.tabListData.forEach((tab: ITabList) => {
      tab.active = false;
    });
    this.tabListData[index].active = true;
    this.componentActiveTab = this.tabListData[index].component;
  }

  initialActiveTabComponent(): void {
    this.tabListData.forEach((tab: ITabList) => {
      if (tab.active) {
        this.componentActiveTab = tab.component;
        return;
      }
    })
  }


  createInjectorData(): void {
    const dynamicInjector = Injector.create({
      providers: [
        { provide: 'dynamicContext', useValue: this.data },
      ],
      parent: this.injector,
    });
    this.dynamicDataContext = dynamicInjector;

  }

}
