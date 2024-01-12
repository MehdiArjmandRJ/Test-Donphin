import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { IconsModule } from '@app/shared/modules';
import {LayoutComponent} from './layout.component';
import {LayoutRoutingModule} from './layout-routing.module';
import { HeaderComponent, SidebarComponent } from '@app/shared/components';
import { JalaliPipe, TimeFormatPipe } from '@app/shared/pipes';

@NgModule({
  imports: [CommonModule, LayoutRoutingModule, IconsModule, TimeFormatPipe, JalaliPipe],
  declarations: [LayoutComponent, HeaderComponent, SidebarComponent],
})
export class LayoutModule {}
