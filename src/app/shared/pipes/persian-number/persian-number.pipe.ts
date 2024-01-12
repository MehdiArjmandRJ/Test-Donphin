/* eslint-disable no-param-reassign */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'persianNumber',
  standalone: true
})
export class PersianNumberPipe implements PipeTransform {

  transform (value: string | number, ...args: any[]): string {

    if (!value) {
      return '';
    }
    if (typeof value === 'number'){
      value = value.toString();

    }

    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    let  persian = value.replace(/[0-9]/g, (w) => id[Number(w)]);
    const valueHasMinus = value[0] === '-' &&  args.length === 0;
    const showValueHasMinus = value[0] === '-' && args[0] === 'minusAssign';
    const notPercent = value[value.length - 1] !== '%';

    if (valueHasMinus && notPercent ) {
      persian = `(${persian.substring(persian.indexOf('-') + 1, persian.length)})`;
    }
    if (showValueHasMinus && notPercent) {
      persian = `${persian.substring(persian.indexOf('-') + 1, persian.length)} -`;
    }

    return persian;
  }

}
