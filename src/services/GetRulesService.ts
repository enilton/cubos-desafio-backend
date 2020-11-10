// import AppError from '../errors/AppError';

import Rule from '../models/Rule';
import Interval from '../models/Interval';

import RulesRepository from '../repositories/RulesRepository';

import * as Utils from '../utils/Utils';
interface IRule {
  type: 'unique | daily | weekly';
  interval: Interval;
}

interface IDateInterval {
  dateStart: Date;
  dateEnd: Date;
}

interface IDisp {
  day: string;
  intervals: string;
}

class CreateRuleService {

  public async executeGetAll(): Promise<Rule[] | undefined> {
      const rulesRepository = new RulesRepository();
      return await rulesRepository.all();
  }

  public async executeGetDisp(dateInterval: IDateInterval): Promise<IDisp[] | undefined>{
    const rulesRepository = new RulesRepository();
    const rules = await rulesRepository.all();

    let disp: IDisp[] = [];

    var arrDt = dateInterval.dateEnd.toString().split('-');
    var fmt = arrDt[1] + '-' + arrDt[0] + '-' + arrDt[2];
    var dtFmtEnd = new Date(fmt);

    arrDt = dateInterval.dateStart.toString().split('-');
    fmt = arrDt[1] + '-' + arrDt[0] + '-' + arrDt[2];
    var dtFtStart = new Date(fmt);

    let timeDiff = Math.abs(dtFmtEnd.getTime() - dtFtStart.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    rules.map(item => {

      if (item.type === 'unique'){

        if (new Date(item.date) >= dateInterval.dateStart && new Date(item.date) <= dateInterval.dateEnd){
          disp.push({
            day: item.date,
            intervals: Utils.FormatIntervals(item.intervals),
          });
        }
      }

      if (item.type === 'daily'){

        for (let i = 1; i <= diffDays + 1 ; i++) {
          disp.push({
            day: Utils.FormatDate(Utils.NextDate(dtFtStart, i)),
            intervals: Utils.FormatIntervals(item.intervals),
          });
        }
      }

      if(item.type === 'weekly') {

        for (let i = 1; i <= diffDays + 1; i++) {

          let currentDate = Utils.NextDate(dtFtStart, i);

          if (item.days.includes(currentDate.getDay())) {
            disp.push({
              day: Utils.FormatDate(currentDate),
              intervals: Utils.FormatIntervals(item.intervals),
            });
          }

        }
      }
    });

    return await Utils.ArrayOrderByDay(disp);
  }
}


export default CreateRuleService;
