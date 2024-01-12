import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//Modules
import { FormsModule } from '@angular/forms';
import { AgGridComponent, IconsModule, SharedButtonComponent } from '@app/shared/modules';
import { AgGridModule } from 'ag-grid-angular';

//Component
import { HomeComponent } from './home.component';

//Services

//Respository

//Routing
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
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeModule { }
