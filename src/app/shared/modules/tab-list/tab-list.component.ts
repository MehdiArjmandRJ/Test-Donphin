import { CommonModule } from '@angular/common';
import { Component, Injector, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
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
  dynamicComponentInjectorValue!: Injector;

  @Input() data: any;
  @Input() tabListData!: ITabList[];
  // dynamicDataContext: { $implicit: any } = { $implicit: null };

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer!: ViewContainerRef;

  constructor(
    private injector: Injector,
  ) { }

  ngOnInit() {
    this.initialActiveTabComponent();
    this.dynamicComponentInjectorValue = this.dynamicComponentInjector();
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

  dynamicComponentInjector() {
    const injector = Injector.create({
      providers: [
        { provide: 'dataToPass', useValue: this.data },
      ],
      parent: this.dynamicComponentContainer?.injector,
    });
    return injector;
  }

}
