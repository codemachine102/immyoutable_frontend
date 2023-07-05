import moment from 'moment';

//constants
import { months } from '../constants';

export const formatDateDMY = (date: Date, separator: string = '/') => {
  let day = '' + date.getDate();
  let month = '' + (date.getMonth() + 1);
  let year = '' + date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join(separator);
};

export const formatDateMDY = (date: Date, separator: string = '/') => {
  // console.log('formatDateMDY', date);
  let day = '' + date.getDate();
  let month = '' + (date.getMonth() + 1);
  let year = '' + date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [month, day, year].join(separator);
};

export const formatedDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const dateNow = new Date();
  const diff = (dateNow.getTime() - date.getTime()) / 1000 / 60;
  // console.log({ dateStr, date, diff });

  if (diff > 1380) {
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  return `${Math.round(diff / 60)}h`;
};

export const formatedDateMoment = (dateStr: string) => {
  return moment(dateStr).fromNow();
};
