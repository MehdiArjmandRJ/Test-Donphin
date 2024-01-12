import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  HostListener
} from '@angular/core';
import * as moment from 'moment-jalaali';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  RxReactiveFormsModule
} from '@rxweb/reactive-form-validators';
import {IconsModule} from '../custom-icons/icons.module';
import {SharedButtonComponent} from '../shared-button/shared-button.component';

moment.loadPersian({dialect: 'persian-modern'});

@Component({
  selector: 'app-shared-datepicker',
  templateUrl: './shared-datepicker.component.html',
  styleUrls: ['./shared-datepicker.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    SharedButtonComponent,
  ]
})
export class DatepickerComponent implements OnInit, OnChanges {
  @Input() mode = 'range';
  @Input() endLabel!: string;
  @Input() startLabel!: string;
  @Input() endInputName!: string;
  @Input() endPlaceholder!: string;
  @Input() startInputName!: string;
  @Input() inputForm: any;
  @Input() startPlaceholder!: string;

  @Input() minDate: moment.Moment | undefined;
  @Input() maxDate!: moment.Moment | undefined;
  @ViewChild('calendar', { static: false }) calendarElement!: ElementRef;

  public startInput!: string | null;
  public endInput!: string | null;
  public startDate!: string | null;
  public endDate!: string | null;
  public calendarDates: any[] = [];
  private startingDate: moment.Moment = moment();

  public showCalendar = false;
  public LANG = 'fa';
  public CONSTANTS: any = {
    day: this.LANG === 'fa' ? 'jDay' : 'day',
    month: this.LANG === 'fa' ? 'jMonth' : 'month',
    year: this.LANG === 'fa' ? 'jYear' : 'year',
    dayFormat: this.LANG === 'fa' ? 'jD' : 'D',
    monthFormat: this.LANG === 'fa' ? 'jMMMM' : 'MMMM',
    yearFormat: this.LANG === 'fa' ? 'jYY' : 'YYYY',
    weekdays:
      this.LANG === 'fa'
        ? ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
        : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  };

  ngOnChanges (change: SimpleChanges) {
    if (
      change['inputForm'].currentValue !== change['inputForm'].previousValue
    ) {
      const values = change['inputForm'].currentValue.value;

      if (values[this.startInputName] !== '' && values[this.startInputName]) {
        this.startDate = values[this.startInputName];
        this.startInput = moment(values[this.startInputName]).format(
          'jD jMMMM jYYYY'
        );
      }

      if (values[this.endInputName]) {
        this.endDate = values[this.endInputName];
        this.endInput = moment(values[this.endInputName]).format(
          'jD jMMMM jYYYY'
        );
      }

      this.createCalendar(this.startingDate);
    }
  }

  ngOnInit (): void {
    this.createCalendar(this.startingDate);

    this.inputForm.controls[this.startInputName].valueChanges.subscribe(
      (value: any) => {
        if (value) {
          this.startDate = value;
          this.startInput = moment(value).format('jD jMMMM jYYYY');
        } else {
          this.startDate = null;
          this.startInput = null;
        }
      }
    );
  }

  onFocusInput () {
    this.showCalendar = true;
  }

  hasError (controlName: string) {
    return (
      this.inputForm && 
      this.inputForm.controls[controlName].hasError('required') &&
      this.inputForm.controls[controlName].touched
    );
  }

  getErrors (controlName: string) {
    const formControls: any = this.inputForm?.controls[controlName];
    return formControls['errorMessage'];
  }

  @HostListener('document:click', ['$event'])
  onClickedOutside (event: any) {
    if (!this.calendarElement.nativeElement.contains(event.target)) {
      this.showCalendar = false;
    }
  }

  onChangeLang () {
    this.LANG = this.LANG === 'fa' ? 'en' : 'fa';
    this.CONSTANTS = {
      day: this.LANG === 'fa' ? 'jDay' : 'day',
      month: this.LANG === 'fa' ? 'jMonth' : 'month',
      year: this.LANG === 'fa' ? 'jYear' : 'year',
      dayFormat: this.LANG === 'fa' ? 'jD' : 'D',
      monthFormat: this.LANG === 'fa' ? 'jMMMM' : 'MMMM',
      yearFormat: this.LANG === 'fa' ? 'jYYYY' : 'YYYY',
      weekdays:
        this.LANG === 'fa'
          ? ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
          : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    };
    this.createCalendar(this.startingDate);
  }

  onGoToday () {
    this.startingDate = moment();
    this.createCalendar(this.startingDate);
  }

  checkPrevDisable () {
    return (
      this.minDate && moment(this.startingDate).isSame(this.minDate, 'month')
    );
  }

  checkFrwDisable () {
    return (
      this.maxDate && moment(this.startingDate).isSame(this.maxDate, 'month')
    );
  }

  createCalendar (insertedDate: moment.Moment) {
    this.calendarDates = [];
    const datepickerData = {
      constants: this.CONSTANTS,
      countingIndex: this.mode === 'single' ? 1 : 2
    };
    let startingDate = moment(insertedDate);
    if (this.minDate && moment(this.minDate).isAfter(startingDate)) {
      startingDate = moment(this.minDate);
    }

    for (
      let monthIndex = 0;
      monthIndex < datepickerData.countingIndex;
      monthIndex++
    ) {
      const month = {
        endDayOfMonth: moment(startingDate).endOf(
          datepickerData.constants.month
        ),
        startDayOfMonth: moment(startingDate).startOf(
          datepickerData.constants.month
        ),
        startDayOfWeek: moment(
          moment(startingDate).startOf(datepickerData.constants.month)
        ).day()
      };

      if (this.LANG === 'fa') {
        month.startDayOfWeek += 1;
      }

      let days: any[] = [];
      for (let dayIndex = 0; dayIndex < 42; dayIndex++) {
        const actionDatePickerData = {
          isInCurrentMonth: moment(
            moment(month.startDayOfMonth).add(dayIndex - month.startDayOfWeek, 'day').format('YYYY-MM-DD')
          ).isBetween(
            moment(month.startDayOfMonth).subtract(1, 'day').format('YYYY-MM-DD'),
            moment(month.endDayOfMonth).add(1, 'day').format('YYYY-MM-DD')
          ),
          isFuture: this.maxDate
            ? moment(moment(this.maxDate).format('YYYY-MM-DD')).isBefore(
              moment(month.startDayOfMonth).add(dayIndex - month.startDayOfWeek, 'day').format('YYYY-MM-DD')
            )
            : false,
          isPast: this.minDate
            ? !moment(
              moment(this.minDate).subtract(1, 'day').format('YYYY-MM-DD')
            ).isBefore(
              moment(month.startDayOfMonth).add(dayIndex - month.startDayOfWeek, 'day').format('YYYY-MM-DD')
            )
            : false,
          isFriday: dayIndex % 7 === 6,
          isToday: moment(
            moment(month.startDayOfMonth).add(
              dayIndex - month.startDayOfWeek,
              'day'
            )
          ).isSame(moment(), 'day'),
          isStart: this.startDate
            ? moment(
              moment(month.startDayOfMonth).add(
                dayIndex - month.startDayOfWeek,
                'day'
              )
            ).isSame(moment(this.startDate).format('YYYY-MM-DD'), 'day')
            : false,
          isEnd: this.endDate
            ? moment(
              moment(month.startDayOfMonth).add(
                dayIndex - month.startDayOfWeek,
                'day'
              )
            ).isSame(moment(this.endDate).format('YYYY-MM-DD'), 'day')
            : false,
          isBetween:
            this.endDate && this.startDate
              ? moment(
                moment(month.startDayOfMonth).add(dayIndex - month.startDayOfWeek, 'day').format('YYYY-MM-DD')
              ).isBetween(
                moment(this.startDate).format('YYYY-MM-DD'),
                moment(this.endDate).format('YYYY-MM-DD')
              )
              : false
        };

        if (dayIndex < month.startDayOfWeek) {
          const date = moment(month.startDayOfMonth).subtract(
            dayIndex + 1,
            'day'
          );

          days.push({
            isFriday: actionDatePickerData.isFriday,
            isFuture: false,
            isPast: true,
            isInCurrentMonth: false,
            date: date.format('YYYY-MM-DD'),
            dayNum: date.format(datepickerData.constants.dayFormat)
          });
        } else {
          if (dayIndex === month.startDayOfWeek) {
            days = days.reverse();
          }

          const date = moment(month.startDayOfMonth).add(
            dayIndex - month.startDayOfWeek,
            'day'
          );

          days.push({
            isPast: actionDatePickerData.isPast,
            isFuture: actionDatePickerData.isFuture,
            isEnd: actionDatePickerData.isEnd,
            isStart: actionDatePickerData.isStart,
            isFriday: actionDatePickerData.isFriday,
            isToday: actionDatePickerData.isToday,
            isBetween: actionDatePickerData.isBetween,
            isInCurrentMonth: actionDatePickerData.isInCurrentMonth,
            date: date.format('YYYY-MM-DD'),
            dayNum: date.format(datepickerData.constants.dayFormat)
          });
        }
      }

      this.calendarDates.push({
        monthDays: days,
        monthName: moment(startingDate).locale(this.LANG).format(datepickerData.constants.monthFormat),
        yearName: startingDate.format(datepickerData.constants.yearFormat)
      });

      startingDate.add(1, datepickerData.constants.month);
    }
  }

  onPrevMonth () {
    this.startingDate = moment(this.startingDate).subtract(
      1,
      this.CONSTANTS.month
    );
    this.createCalendar(this.startingDate);
  }

  onForwardMonth () {
    this.startingDate = moment(this.startingDate).add(1, this.CONSTANTS.month);
    this.createCalendar(this.startingDate);
  }

  onSelectDate (event: Event, date: string) {
    event.stopPropagation();
    if (this.mode === 'single') {
      this.selectSingleDate(date);
      return;
    }

    if (!this.startDate && !this.endDate) {
      this.startDate = date;
      this.createCalendar(this.startingDate);
    } else if (this.startDate && !this.endDate) {
      if (
        moment(moment(date).format('YYYY-MM-DD')).isBefore(
          moment(this.startDate).format('YYYY-MM-DD')
        )
      ) {
        this.startDate = date;
        this.createCalendar(this.startingDate);
      } else {
        this.endDate = date;
        this.createCalendar(this.startingDate);
      }
    } else if (!this.startDate && this.endDate) {
      if (
        moment(moment(this.endDate).format('YYYY-MM-DD')).isBefore(
          moment(date).format('YYYY-MM-DD')
        )
      ) {
        this.endDate = null;
        this.startDate = date;
        this.createCalendar(this.startingDate);
      } else {
        this.startDate = date;
        this.createCalendar(this.startingDate);
      }
    } else if (this.startDate && this.endDate) {
      this.endDate = null;
      this.endInput = null;
      this.startDate = date;
      this.createCalendar(this.startingDate);
    }

    const format = this.LANG === 'fa' ? 'jD jMMMM jYYYY' : 'D MMMM YYYY';
    if (this.startDate) {
      this.startInput = moment(this.startDate).format(format);
      this.inputForm.controls[this.startInputName].markAsTouched();
      this.inputForm.controls[this.startInputName].setValue(this.startDate);
    }

    if (this.endDate) {
      this.endInput = moment(this.endDate).format(format);
      this.inputForm.controls[this.endInputName].markAsTouched();
      this.inputForm.controls[this.endInputName].setValue(this.endDate);
    }
  }

  selectSingleDate (date: string) {
    this.startDate = date;
    this.createCalendar(this.startingDate);

    const format = this.LANG === 'fa' ? 'jD jMMMM jYYYY' : 'D MMMM YYYY';
    if (this.startDate) {
      this.startInput = moment(this.startDate).format(format);
      this.inputForm.controls[this.startInputName].markAsTouched();
      this.inputForm.controls[this.startInputName].setValue(this.startDate);
    }

    this.showCalendar = false;
  }

  onClearSelected (event: Event, type: string) {
    event.stopPropagation();
    if (type === 'start') {
      this.startDate = null;
      this.startInput = null;
      this.inputForm.controls[this.startInputName].setValue('');
    } else if (type === 'end') {
      this.endDate = null;
      this.endInput = null;
      this.inputForm.controls[this.endInputName].setValue('');
    }

    this.createCalendar(this.startingDate);
  }

  getSelectedDate (date: string) {
    return this.LANG === 'fa'
      ? moment(date, 'YYYY-MM-DD').format('jD jMMMM')
      : moment(date, 'YYYY-MM-DD').format('D MMMM');
  }
}
