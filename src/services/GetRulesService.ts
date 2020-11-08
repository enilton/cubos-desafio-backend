// import AppError from '../errors/AppError';

import Rule from '../models/Rule';
import Interval from '../models/Interval';

import RulesRepository from '../repositories/RulesRepository';

import AppError from '../errors/AppError';

import { v4 as uuid } from 'uuid';

interface IRule {
  type: 'unique | daily | weekly';
  interval: Interval;
}

class CreateRuleService {

  public async execute(): Promise<Rule[] | undefined> {
      const rulesRepository = new RulesRepository();
      return await rulesRepository.all();
  }
}

export default CreateRuleService;
