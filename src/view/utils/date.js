import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';

import { DateFormats } from '../../const';

dayjs.extend(duration);

const getDuration = (dateFrom, dateTo) => {
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

export { getDuration, displayDate, displayDateMonth, displayTime, displayDateTime };
