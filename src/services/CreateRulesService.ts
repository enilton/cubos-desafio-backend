// import AppError from '../errors/AppError';

import Rule from '../models/Rule';
import Interval from '../models/Interval';

import RulesRepository from '../repositories/RulesRepository';

import { v4 as uuid } from 'uuid';

interface IRule {
  type: 'unique | daily | weekly';
  interval: Interval;
  days: number[];
}

class CreateRuleService {

  public async execute({type, interval, days}: IRule): Promise<Rule> {
    const rulesRepository = new RulesRepository();

    let rule: Rule = new Rule();
    rule.id =  uuid();
    rule.type = type;
    rule.interval = interval;
    rule.days = days;

    await rulesRepository.save(rule);
    return rule;
  }
}

export default CreateRuleService;
