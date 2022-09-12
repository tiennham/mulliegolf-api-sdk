export enum Months {
  January = 'January',
  February = 'February',
  March = 'March',
  April = 'April',
  May = 'May',
  June = 'June',
  July = 'July',
  August = 'August',
  September = 'September',
  October = 'October',
  November = 'November',
  December = 'December',
}

export enum YesNo {
  YES = 'Y',
  NO = 'N',
}

export enum PlatForm {
  IOS = 'ios',
  ANDDROID = 'android',
  WEB = 'web',
}

export interface Pagination<T> {
  count: number;
  results: Array<T>;
  next?: string;
  previous?: string;
}
