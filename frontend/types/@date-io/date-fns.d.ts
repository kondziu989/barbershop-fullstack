export = index;
declare class index {
  constructor(_a: any);
  yearFormat: any;
  yearMonthFormat: any;
  dateTime12hFormat: any;
  dateTime24hFormat: any;
  time12hFormat: any;
  time24hFormat: any;
  dateFormat: any;
  locale: any;
  addDays(value: any, count: any): any;
  date(value: any): any;
  endOfDay(value: any): any;
  endOfMonth(value: any): any;
  format(date: any, formatString: any): any;
  formatNumber(numberToFormat: any): any;
  getCalendarHeaderText(date: any): any;
  getDatePickerHeaderText(date: any): any;
  getDateTimePickerHeaderText(date: any): any;
  getDayText(date: any): any;
  getDiff(value: any, comparing: any): any;
  getHourText(date: any, ampm: any): any;
  getHours(value: any): any;
  getMeridiemText(ampm: any): any;
  getMinuteText(date: any): any;
  getMinutes(date: any): any;
  getMonth(date: any): any;
  getMonthArray(date: any): any;
  getMonthText(date: any): any;
  getNextMonth(date: any): any;
  getPreviousMonth(date: any): any;
  getSecondText(date: any): any;
  getSeconds(value: any): any;
  getWeekArray(date: any): any;
  getWeekdays(): any;
  getYear(value: any): any;
  getYearRange(start: any, end: any): any;
  getYearText(date: any): any;
  isAfter(value: any, comparing: any): any;
  isAfterDay(date: any, value: any): any;
  isAfterYear(date: any, value: any): any;
  isBefore(value: any, comparing: any): any;
  isBeforeDay(date: any, value: any): any;
  isBeforeYear(date: any, value: any): any;
  isEqual(date: any, comparing: any): any;
  isNull(date: any): any;
  isSameDay(value: any, comparing: any): any;
  isValid(value: any): any;
  mergeDateAndTime(date: any, time: any): any;
  parse(value: any, formatString: any): any;
  setHours(value: any, count: any): any;
  setMinutes(value: any, count: any): any;
  setMonth(date: any, count: any): any;
  setSeconds(value: any, count: any): any;
  setYear(value: any, count: any): any;
  startOfDay(value: any): any;
  startOfMonth(value: any): any;
}