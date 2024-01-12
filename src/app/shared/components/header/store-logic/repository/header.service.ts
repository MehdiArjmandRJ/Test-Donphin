import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { MarketConnectionStateEnum } from '../enums/market-connection-state.enum';
import { Clock } from '../models/clock.model';

@Injectable()
export class HeaderService {
  private lastConnectDate!: Date;
  private _secondsToDisconnect = 20;
  private ticksSignalRData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private marketClock: BehaviorSubject<Clock> = new BehaviorSubject<Clock>(new Clock(new Date()));
  private marketConnectionState: BehaviorSubject<MarketConnectionStateEnum> = new BehaviorSubject<MarketConnectionStateEnum>(MarketConnectionStateEnum.Disconnect);

  marketClock$: Observable<Clock> = this.marketClock.asObservable();
  marketConnectionState$: Observable<MarketConnectionStateEnum> = this.marketConnectionState.asObservable();

  public get secondsToDisconnect(): number {
    return this._secondsToDisconnect;
  }
  public set secondsToDisconnect(value: number) {
    this._secondsToDisconnect = value;
  }

  constructor() {

    this.setIntervalToDisconnect();

    this.ticksSignalRData.subscribe((data) => {
      if (data?.serverDateTime) {
        this.lastConnectDate = new Date();

        this.marketConnectionState.next(MarketConnectionStateEnum.Connect);

        this.marketClock.next(new Clock(new Date(data.serverDateTime)));
      }
    });
  }

  setIntervalToDisconnect() {
    setInterval(() => {
      if (this.lastConnectDate !== null) {
        const now = new Date();

        const dateToDisconnect = new Date(this.lastConnectDate);

        dateToDisconnect.setSeconds(dateToDisconnect.getSeconds() + this.secondsToDisconnect);

        if (now > dateToDisconnect) {
          this.marketConnectionState.next(MarketConnectionStateEnum.Disconnect);
        }
      }
    }, this._secondsToDisconnect);
  }

}
