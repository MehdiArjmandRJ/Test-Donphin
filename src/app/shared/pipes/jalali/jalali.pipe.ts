import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-jalaali';

moment.loadPersian({ dialect: 'persian-modern' });

@Pipe({
  name: 'jalali',
  standalone: true
})
export class JalaliPipe implements PipeTransform {
  transform(value: unknown, arg = 'full'): unknown {
    if (!value) {
      return '';
    }

    if (arg === 'time') {
      let date = String(value);

      if (date[date.length - 1] === 'Z'){
        date = date.slice(0, -1);
      }

      return date.split('T')[1].slice(0, -3);
    }

    return moment(value).format('dddd  LL');
  }
}
