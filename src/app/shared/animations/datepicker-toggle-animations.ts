import {animate, state, style, transition, trigger} from '@angular/animations';

export class DatePickerAnimation {
  static toggleDatePicker = trigger('toggleDatePicker', [
    state(
      'open',
      style({
        top: '-100%',
        right: '10px',
        'font-size': '0.75rem',
        'background-color': '#fff',
      })
    ),
    state(
      'close',
      style({
        top: '*',
      })
    ),
    transition('open <=> close', animate('200ms ease-in-out')),
  ]);

}
