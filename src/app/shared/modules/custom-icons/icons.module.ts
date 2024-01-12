import { NgModule } from '@angular/core';
import { provideSvgIcons, SvgIconComponent } from '@ngneat/svg-icon';
import { arrowIcons } from './icons/Arrow';
import { businessIcons } from './icons/Business';
import { computersDevicesElectronicsIcons } from './icons/Computers-Devices-Electronics';
import { contentEditIcons } from './icons/Content-Edit';
import { emailsMessagesIcons } from './icons/Emails-Messages';
import { essetionalIcons } from './icons/Essetional';
import { gridIcons } from './icons/Grid';
import { moneyIcons } from './icons/Money';
import { notificationsIcons } from './icons/Notifications';
import { searchIcons } from './icons/Search';
import { securityIcons } from './icons/Security';
import { shopIcons } from './icons/Shop';
import { supportLikeQuestionIcons } from './icons/Support-Like-Question';
import { usersIcons } from './icons/Users';

@NgModule({
  providers: [
    provideSvgIcons([
      ...businessIcons,
      ...shopIcons,
      ...arrowIcons,
      ...emailsMessagesIcons,
      ...notificationsIcons,
      ...gridIcons,
      ...essetionalIcons,
      ...moneyIcons,
      ...contentEditIcons,
      ...usersIcons,
      ...supportLikeQuestionIcons,
      ...computersDevicesElectronicsIcons,
      ...securityIcons,
      ...searchIcons,
    ]),
  ],
  imports: [
    SvgIconComponent,
  ],
  exports: [
    SvgIconComponent,
  ]
})
export class IconsModule { }
