import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { DateFormats } from './const';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const calculateDuration = (dateFrom, dateTo) => {
  const dateDelta = dayjs.duration(dayjs(dateTo).diff(dateFrom));
  if (dateDelta.days()) {
    return dateDelta.format(DateFormats.DAY);
  }

  if (dateDelta.hours()) {
    return dateDelta.format(DateFormats.HOURS);
  }

  return dateDelta.format(DateFormats.MINUTES);
};

const displayDateMonth = (date) => date ? dayjs(date).format(DateFormats.DATE_MONTH) : '';
const displayDate = (date) => date ? dayjs(date).format(DateFormats.DATE) : '';
const displayTime = (time) => time ? dayjs(time).format(DateFormats.TIME) : '';
const displayDateTime = (date, dateFormat = DateFormats.DATE_TIME_SYSTEM) => date ? dayjs(date).format(dateFormat) : '';

const firstLetterUpperCase = (word) => {
  const [firstLetter,...rest] = word;
  return `${firstLetter.toUpperCase()}${rest.join('')}`;
};

export { calculateDuration, displayDate, displayDateMonth, displayTime, displayDateTime, firstLetterUpperCase };
