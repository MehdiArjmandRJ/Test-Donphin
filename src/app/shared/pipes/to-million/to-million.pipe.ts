import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'million',
  standalone: true,
})
export class MillionPipe implements PipeTransform {
  transform(value: number):string {
    if (!value || value === 0) {
      return '0';
    }

    const input = String(value);
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
}
