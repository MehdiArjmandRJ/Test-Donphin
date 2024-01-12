import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const timeParts = value.split(':');
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);

    let hours = parseInt(timeParts[0], 10);

    let meridian = 'AM';
    if (hours >= 12) {
      meridian = 'PM';
      if (hours > 12) {
        hours -= 12;
      }
    }

    const formattedTime = `${hours}:${minutes}:${seconds} ${meridian}`;
    return formattedTime;
  }
}
