import { Component } from '@angular/core';

import { MarketConnectionStateEnum } from './store-logic/enums/market-connection-state.enum';
import { Clock } from './store-logic/models/clock.model';
import { HeaderService } from './store-logic/repository/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    HeaderService,
  ]
})
export class HeaderComponent {
  marketClock!: Clock;
  marketDate!: string;
  marketConnectionState!: MarketConnectionStateEnum;

  constructor(
    private headerService: HeaderService,
  ){
    this.getClockData();
  }

  private getClockData() {
    this.headerService.marketClock$.subscribe(( clock ) => {
      this.marketClock = clock;
      this.marketDate = clock.date.toString();
    });

    this.headerService.marketConnectionState$.subscribe(( state ) => {
      this.marketConnectionState = state;
    });
  }
}
