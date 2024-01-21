import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//Modules
import { FormsModule } from '@angular/forms';
import { AgGridComponent, IconsModule, SharedButtonComponent, SharedInputComponent } from '@app/shared/modules';
import { AgGridModule } from 'ag-grid-angular';
import { PaginatorModule } from 'primeng/paginator';

//Component
import { HomeComponent } from './home.component';

//Services

//Respository

//Routing
import { TabListComponent } from '@app/shared/modules/tab-list/tab-list.component';
import { CameraManagementComponent, UnitsComponent, UnitTagComponent } from './components';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    HomeRoutingModule,
    SharedButtonComponent,
    FormsModule,
    AgGridComponent,
    AgGridModule,
    SharedInputComponent,
    TabListComponent,PaginatorModule

  ],
  declarations: [
    HomeComponent,
    UnitsComponent,
    UnitTagComponent,
    CameraManagementComponent
  ]
})
export class HomeModule { }
