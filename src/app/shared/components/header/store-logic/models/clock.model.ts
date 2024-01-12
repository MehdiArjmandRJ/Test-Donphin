export class Clock {
  private readonly _date : Date;

  public clockStr!: string;
  public get date() : Date {
    return this._date;
  }

  constructor(date: Date) {
    this._date = date;

    this.setClockStr(date);

    setInterval(() => {
      date.setSeconds(date.getSeconds() + 1);

      this.setClockStr(date);
    }, 1000);
  }

  private setClockStr(date: Date) {
    let hours = date?.getHours().toString();
    let minutes = date?.getMinutes().toString();
    let seconds = date?.getSeconds().toString();

    if (hours.length < 2) {
      hours = '0' + hours;
    }

    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
    this.clockStr = hours + ':' + minutes + ':' + seconds;
  }
}
