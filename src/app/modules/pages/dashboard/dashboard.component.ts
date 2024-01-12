import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';

import { HttpClient, HttpContext } from '@angular/common/http';
import { HttpLoaderService } from '@app/core/config/http-loader.service';
import { IS_LOADING_ENABLED } from '@app/core/interceptor/custom-auth-interceptor';
import { LoadingType } from '@app/core/models/config.model';
import {
  CheckBoxInterface,
  ListItemInterface,
  RadioButtonInterface,
  UploaderDataInterface
} from '@app/shared/models/general.interface';
import { TestFormModel } from './models/dashboard.form.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  autoCompleteOneRequest!: any;
  autoCompleteTwoRequest!: any;
  autoCompleteThreeRequest!: any;
  autoCompleteValueOne!: string;
  title = 'داشبورد';
  inputTest = 'asdasd';
  progress!: number;
  prevAvatar: string | ArrayBuffer = 'preview';
  selectBoxValue: ListItemInterface = {
    label: 'انتخاب اول',
    value: '1'
  };
  form!: RxFormGroup;
  listOfValueExampleDataOne!: string[];
  autoCompleteValueOneList!: ListItemInterface;
  listItems: ListItemInterface[] = [
    {
      label: 'انتخاب اول',
      value: '1'
    },
    {
      label: 'انتخاب دوم',
      value: '2'
    },
    {
      label: 'انتخاب سوم',
      value: '3'
    },
  ];
  radioExampleDataOne: RadioButtonInterface[] = [
    {
      name: 'hello',
      value: '1',
      active: true,
      label: 'Number One'
    },
    {
      name: 'hello',
      value: '2',
      active: false,
      label: 'Number Two'
    },
    {
      name: 'hello',
      value: '3',
      active: false,
      label: 'Number Three'
    },
  ];
  radioExampleDataTwo: RadioButtonInterface[] = [
    {
      name: 'hello2',
      value: 'One',
      active: false,
      label: 'Number One'
    },
    {
      name: 'hello2',
      value: 'Two',
      active: false,
      label: 'Number Two'
    },
    {
      name: 'hello2',
      value: 'Three',
      active: false,
      label: 'Number Three'
    },
  ];
  radioExampleDataThree: RadioButtonInterface[] = [
    {
      name: 'Bye',
      value: 'One',
      active: false,
      label: 'Bye Number One'
    },
    {
      name: 'Bye',
      value: 'Two',
      active: true,
      label: 'Bye Number Two'
    },
    {
      name: 'Bye',
      value: 'Three',
      active: false,
      label: 'Bye Number Three'
    },
  ];
  checkBoxExampleDataOne: CheckBoxInterface[] = [
    {
      name: 'hello',
      value: '1',
      active: true,
      label: 'Number One'
    },
    {
      name: 'hello',
      value: '2',
      active: false,
      label: 'Number Two'
    },
    {
      name: 'hello',
      value: '3',
      active: false,
      label: 'Number Three'
    },
  ];
  checkBoxExampleDataTwo: CheckBoxInterface[] = [
    {
      name: 'hello2',
      value: 'One',
      active: false,
      label: 'Number One'
    },
    {
      name: 'hello2',
      value: 'Two',
      active: false,
      label: 'Number Two'
    },
    {
      name: 'hello2',
      value: 'Three',
      active: false,
      label: 'Number Three'
    },
  ];
  checkBoxExampleDataThree: CheckBoxInterface[] = [
    {
      name: 'Bye',
      value: 'One',
      active: false,
      label: 'Bye Number One'
    },
    {
      name: 'Bye',
      value: 'Two',
      active: true,
      label: 'Bye Number Two'
    },
    {
      name: 'Bye',
      value: 'Three',
      active: false,
      label: 'Bye Number Three'
    },
  ];
  instrument: any = {
    id: '6436c577-5ea5-ed11-b461-005056969f4f',
    insKey: '00459188-cbf9-43ae-b153-7d5259100f19',
    tmcCode: 65883838195688440,
    eventDate: '0001-01-01T00:00:00',
    instrumentId: 'IRO1IKCO0001',
    enInsCode: 'IKCO',
    enInsName: 'Iran Khodro',
    enCompanyName: 'Iran Khodro',
    faCompanyName: 'ایران‌ خودرو',
    faInsCode: 'خودرو',
    faInsName: 'ایران‌ خودرو',
    companyCode: 'IRO1IKCO0008',
    nominalPrice: 1000,
    shares: 301656068000,
    effectDate: '2023-09-02T00:00:00',
    insChangeType: 0,
    instrumentCategoryCode: 'A',
    insGroupCode: 'N2',
    firstDayTradingDate: '2000-01-01T00:00:00',
    unitPriceType: 1,
    marketCode: 1,
    boardCode: '5',
    sectorCode: '34',
    sectorName: 'خودرو و ساخت قطعات',
    subSectorCode: '3410',
    subSectorName: 'تولید وسایل نقلیه موتوری',
    settlementDelayCode: 3,
    maxThresholdPrice: 0,
    minThresholdPrice: 0,
    baseVolume: 41681139,
    instrumentTypeCode: 300,
    priceChangeTick: 1,
    lot: 1,
    bourseCode: 1,
    minPermittedVolume: 1,
    maxPermittedVolume: 400000,
    valid: true,
    dateReceived: '0001-01-01T00:00:00'
  };

  constructor(
    private titleService: Title,
    public httpLoaderService: HttpLoaderService,
    private formBuilder: RxFormBuilder,
    private httpClient: HttpClient
  ) {
    this.titleService.setTitle(`${this.title}`);
  }

  ngOnInit(): void {
    this.initialTestForm();
    this.autoCompleteOneRequest =
      'https://jsonplaceholder.typicode.com/posts?title=';
    this.autoCompleteTwoRequest =
      'https://jsonplaceholder.typicode.com/posts?title=';
    this.autoCompleteThreeRequest =
      'https://jsonplaceholder.typicode.com/posts?title=';

    setTimeout(() => {
      this.httpClient
        .get('https://jsonplaceholder.typicode.com/posts?title=tehhhh', {
          context: new HttpContext().set(IS_LOADING_ENABLED, {
            key: 'autoComplete',
            type: LoadingType.component,
            value: true
          })
        })
        .subscribe();
    }, 5000);

    setTimeout(() => {
      this.httpClient
        .get('https://jsonplaceholder.typicode.com/posts?title=tehhhh', {
          context: new HttpContext().set(IS_LOADING_ENABLED, {
            key: 'autoComplete1',
            type: LoadingType.component,
            value: true
          })
        })
        .subscribe();
    }, 10000);

    this.httpClient
      .get('https://jsonplaceholder.typicode.com/posts?title=tehhhh', {
        context: new HttpContext().set(IS_LOADING_ENABLED, {
          key: 'autoComplete2',
          type: LoadingType.default,
          value: true
        })
      })
      .subscribe();
  }

  initialTestForm() {
    const formModel: TestFormModel = new TestFormModel();
    this.form = this.formBuilder.formGroup(formModel) as RxFormGroup;
  }

  uploadFile(data: UploaderDataInterface) {
    this.form.controls['imgUrl'].patchValue(data.file);
    this.prevAvatar = data.avatarPrev;
  }

  setErrorMessage(message: unknown) {
  }

  logForm(){
    
  }

}
