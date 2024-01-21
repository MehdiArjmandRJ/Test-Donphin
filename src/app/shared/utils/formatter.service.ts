import * as moment from 'jalali-moment';
import { Injectable } from '@angular/core';
import { ValueFormatterParams } from 'ag-grid-community';

const COLOR = {
  red: '#E20613',
  green: '#1C846A',
  black: 'black'
};

@Injectable()
export class FormatterService {
  currency(params: ValueFormatterParams): string | null {
    if (params.value) {
      const number = Number(params.value).toFixed(0);
      return Math.abs(Number(number)).toLocaleString('en-US');
    } else {
      return null;
    }
  }

  currencyFormatterDecimal(params: ValueFormatterParams): string {
    const number = Number(params.value);
    const absNum = Math.abs(number);

    return absNum.toLocaleString('en-GB', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }

  volume(params: ValueFormatterParams): string {
    return params.value;
  }

  convertToMillion(params: ValueFormatterParams): string {
    if (!params.value || params.value === 0) {
      return '0';
    }

    const input = String(params.value);
    let output: string;

    if (input.length <= 6) {
      return input.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else if (input.length <= 9) {
      output = input.replace(/^0+/, '').replace(/(\d{1,3})(\d{6})$/, '$1M');
    } else {
      output = input.replace(/^0+/, '').replace(/(\d{1,3})(\d{9})$/, '$1B');
    }

    return output;
  }

  percentage(params: ValueFormatterParams): string | null {
    if (params.value) {
      const input = params.value || 0;
      const percentData = Math.abs(input).toFixed(2);
      return `${input >= 0 ? percentData : percentData}%`;
    } else {
      return null;
    }
  }

  numberColor(params: ValueFormatterParams) {
    const cellValue = params.value || 0;
    const color =
      cellValue > 0 ? COLOR.green : cellValue < 0 ? COLOR.red : COLOR.black;
    return { color };
  }

  utcToJalaliWithTime(params: ValueFormatterParams) {
    if (params.value) {
      const gregorianMoment = moment(params?.value, 'YYYY-MM-DDTHH:mm:ss.SSS');
      const jalaliMoment = gregorianMoment?.locale('fa');
      return jalaliMoment?.format('jYYYY/jMM/jDD - HH:mm:ss');
    } else {
      return null;
    }
  }

  utcToJalaliDateOnly(params: ValueFormatterParams) {
    if (params.value) {
      const gregorianMoment = moment(params?.value, 'YYYY-MM-DDTHH:mm:ss.SSS');
      const jalaliMoment = gregorianMoment?.locale('fa');
      return jalaliMoment?.format('jYYYY/jMM/jDD');
    } else {
      return null;
    }
  }

  withdrawStateToTitle(param: ValueFormatterParams) {
    switch (param.value) {
      case 1:
        return 'در حال بررسی';
      case 2:
        return 'در حال بررسی';
      case 3:
        return 'در حال بررسی';
      case 4:
        return ' موجودی کافی نیست';
      case 5:
        return 'تایید شده';
      case 6:
        return 'عدم تایید';
      case 7:
        return 'انجام شده';
      case 8:
        return 'لغو شده';
      case 9:
        return 'عدم تایید';
      case 10:
        return 'عدم تایید';
      default:
        return 'نامشخص';
    }
  }

  documentDepositStateToTitle(param: ValueFormatterParams) {
    switch (param.value) {
      case 1:
        return 'ثبت شده';
      case 2:
        return 'در انتظار تایید';
      case 3:
        return 'تایید شده';
      case 4:
        return 'عدم تایید';
      case 5:
        return 'عدم تایید';
      case 6:
        return 'لغو شده';
      case 7:
        return 'انجام شده';
      case 8:
        return 'عدم تایید';
      default:
        return 'نامشخص';
    }
  }

  IPGDepositStateToTitle(param: ValueFormatterParams) {
    switch (param.value) {
      case 1:
        return 'پرداخت موفق';
      case 2:
        return 'در حال بررسی';
      case 3:
        return 'خطا در ارسال';
      case 4:
        return 'به درگاه بانک منتقل شده';
      case 5:
        return 'برگشت از درگاه بانک';
      case 6:
        return 'در حال تایید';
      case 7:
        return 'تایید شده';
      case 8:
        return 'خطا در تایید';
      case 9:
        return 'لغو توسط کاربر';
      case 10:
        return 'خطا در پرداخت';
      case 11:
        return 'خطای دسترسی به درگاه بانک';
      case 12:
        return 'ارسال واریز به کیف پول';
      case 13:
        return 'خطای کیف پول';
      case 14:
        return 'در حال برگشت تراکنش';
      case 15:
        return 'تراکنش برگشت داده شده است';
      case 16:
        return 'خطای سرور';
      default:
        return 'نامشخص';
    }
  }
}
