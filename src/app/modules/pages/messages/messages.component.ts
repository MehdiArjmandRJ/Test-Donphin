import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  title = 'پیام';
  instrument = {
    'id': '94dc1997-3bb3-ec11-8f11-005056b642fb',
    'insKey': 'a698226b-2b48-48ff-a56d-80145545d803',
    'tmcCode': 34557241988629816,
    'eventDate': '0001-01-01T00:00:00',
    'instrumentId': 'IRO1BRKT0001',
    'enInsCode': 'BRKT',
    'enInsName': 'G.Barekat Pharm',
    'enCompanyName': 'G.Barekat Pharm',
    'faCompanyName': 'گروه دارویی برکت',
    'faInsCode': 'برکت',
    'faInsName': 'گروه دارویی برکت',
    'companyCode': 'IRO1BRKT0003',
    'nominalPrice': 1000,
    'shares': 17340000000,
    'effectDate': '2023-09-02T00:00:00',
    'insChangeType': 0,
    'instrumentCategoryCode': 'A',
    'insGroupCode': 'N1',
    'firstDayTradingDate': '2016-12-11T00:00:00',
    'unitPriceType': 1,
    'marketCode': 1,
    'boardCode': '3',
    'sectorCode': '43',
    'sectorName': 'مواد و محصولات دارویی',
    'subSectorCode': '4399',
    'subSectorName': 'تولید سایر محصولات دارویی',
    'settlementDelayCode': 3,
    'maxThresholdPrice': 0,
    'minThresholdPrice': 0,
    'baseVolume': 6936000,
    'instrumentTypeCode': 300,
    'priceChangeTick': 10,
    'lot': 1,
    'bourseCode': 1,
    'minPermittedVolume': 1,
    'maxPermittedVolume': 200000,
    'valid': true,
    'dateReceived': '0001-01-01T00:00:00'
  };
  gridCols = [
    {
      headerName: 'نماد',
      field: 'name',
      cellStyle: {'font-size': '14px'},
      width: 80,
      undisplayable: true
    },
    {
      headerName: 'نام شرکت',
      field: 'companyName',
      cellStyle: {'font-size': '14px'},
      width: 180
    },
    {
      headerName: 'حجم',
      field: 'weight',
      cellStyle: {'font-size': '14px'},
      width: 535
    },
    {
      headerName: 'قیمت پایانی',
      field: 'finalPrice',
      cellStyle: {'font-size': '14px'},
      width: 580
    },
    {
      headerName: 'قیمت لحظه‌ای',
      field: 'currentPrice',
      cellStyle: {'font-size': '14px'},
      width: 300
    },
  ];
  gridRows = [
    {
      id: this.instrument.insKey,
      name: this.instrument.faInsCode,
      companyName: this.instrument.faCompanyName,
      weight: this.instrument.baseVolume,
      finalPrice: this.instrument.nominalPrice,
      currentPrice: this.instrument.minThresholdPrice,
    },
  ];

  constructor (
    private titleService:Title
  ) {}

  ngOnInit () {
    this.titleService.setTitle($localize`${this.title}`);
  }
}
