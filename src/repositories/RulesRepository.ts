import fs from 'fs';

import Rule from '../models/Rule';

import * as dbConfig from '../config/database';

class RulesRepository {
  public async save(rule: Rule): Promise<Rule> {

    let rules: Array<Rule> = JSON.parse(
      fs.readFileSync(dbConfig.FILEPATH, 'utf8'),
    );

    rules.push(rule);

    fs.writeFileSync(dbConfig.FILEPATH, JSON.stringify(rules));

    return rule;
  }

  public async getById(id: string): Promise<Rule | undefined> {
    let rules: Array<Rule> = JSON.parse(fs.readFileSync(dbConfig.FILEPATH, 'utf8'));
    return rules.find(x => x.id === id);
  }

  public async remove(id: string): Promise<void> {

      let rules: Array<Rule> =  JSON.parse(fs.readFileSync(dbConfig.FILEPATH, 'utf8'));

      let ruleToRemove = rules.find(x => x.id === id);

      if (ruleToRemove) {
        const index = rules.indexOf(ruleToRemove);
        rules.splice(index, 1);
        fs.writeFileSync(dbConfig.FILEPATH, JSON.stringify(rules));
      }
  }

  public async all(): Promise<Rule[]> {
    return JSON.parse(fs.readFileSync(dbConfig.FILEPATH, 'utf8'));
  }

}

export default RulesRepository;
