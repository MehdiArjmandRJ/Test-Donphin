import { Component } from '@angular/core';
import { EmptyGridParam } from "@shared/modules/no-item/models/types";
import { CommonModule } from "@angular/common";
import { IconsModule } from "@shared/modules";
import { SvgIcons } from "@ngneat/svg-icon";

@Component({
  selector: 'app-no-item',
  templateUrl: './no-item.component.html',
  styleUrls: ['./no-item.component.scss'],
  standalone: true,
  imports: [CommonModule, IconsModule]
})
export class NoRowOverlayComponent {
  message = 'داده ای برای نمایش وجود ندارد.';
  icon: SvgIcons = 'c-empty';
  width: string = '65px';
  height: string = '65px';
  color: string = '#a1a1a1';

  // eslint-disable-next-line no-unused-vars
  agInit(params: EmptyGridParam): void {
    this.message = params?.message || this.message;
    this.icon = (params?.icon as SvgIcons) || this.icon;
    this.width = params?.width || this.width;
    this.height = params?.height || this.height;
    this.color = params?.color || this.color;
  }
}
