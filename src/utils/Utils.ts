interface IDisp {
  day: string;
  intervals: string;
}

export const FormatDate = (data: Date) => {

  let dia = data.getDate();
  var mes = data.getMonth() + 1;
  var ano = data.getFullYear();

  return dia + '-' + mes + '-' + ano;
}

export const NextDate = (date: Date, sumDays: number ) => {
  let dt = new Date();
  dt.setDate(date.getDay() + sumDays);
  return dt
}

import Interval from '../models/Interval';

export const FormatIntervals = (intervals: Interval[]) => {
  let intFmt = '[';

  intervals.map(item => {
    intFmt += '{ start: ' + item.start + ', end: ' + item.end + '}';
  });

  intFmt += ']';

  return intFmt;
};

export const ArrayOrderByDay = async (arr:IDisp[]) => {
  arr.sort((a: IDisp, b: IDisp) => {
    return (
      new Date(
        a.day.split('-')[1] +
          '-' +
          a.day.split('-')[0] +
          '-' +
          a.day.split('-')[2],
      ).getTime() -
      new Date(
        b.day.split('-')[1] +
          '-' +
          b.day.split('-')[0] +
          '-' +
          b.day.split('-')[2],
      ).getTime()
    );
  });

  return arr
}

