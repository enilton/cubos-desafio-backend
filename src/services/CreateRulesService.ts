// import AppError from '../errors/AppError';

import Rule from '../models/Rule';
import Interval from '../models/Interval';

import RulesRepository from '../repositories/RulesRepository';

import { v4 as uuid } from 'uuid';

interface IRule {
  type: 'unique' | 'daily' | 'weekly';
  intervals: Interval[];
  date: string;
  days: number[];
}

class CreateRuleService {

  public async execute({type, intervals, date, days}: IRule): Promise<Rule> {
    const rulesRepository = new RulesRepository();

    let rule: Rule = new Rule();
    rule.id =  uuid();
    rule.type = type;
    rule.date = date;
    rule.intervals = intervals;
    rule.days = days;

    await rulesRepository.save(rule);
    return rule;
  }
}

export default CreateRuleService;
