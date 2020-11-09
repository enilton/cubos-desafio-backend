// import AppError from '../errors/AppError';

import Rule from '../models/Rule';
import Interval from '../models/Interval';

import RulesRepository from '../repositories/RulesRepository';

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
  // importintervals: string[];
}

class CreateRuleService {

  public async executeGetAll(): Promise<Rule[] | undefined> {
      const rulesRepository = new RulesRepository();
      return await rulesRepository.all();
  }

  public async executeGetDisp(dateInterval: IDateInterval): Promise<IDisp[] | undefined>{
    const rulesRepository = new RulesRepository();
    const rules = await rulesRepository.getDisp(dateInterval.dateStart, dateInterval.dateEnd);
    rules.sort((a: Rule, b:Rule) =>  a.interval.start > b.interval.end? 1 : -1 );

    let disp: IDisp[] = [];

    rules.map(rule => {
      let startDay = new Date(rule.interval.start).getDate();
      let startMonth = new Date(rule.interval.start).getMonth() + 1;
      let startYear = new Date(rule.interval.start).getFullYear();

      disp.push(
        {
          day: startDay + '-' + startMonth + '-' + startYear,
        }
      )
    })

    return disp;

  }
}

export default CreateRuleService;
