import RulesRepository from '../repositories/RulesRepository';

interface IRes {
  success: boolean,
  message: string
}

class CreateRuleService {
  public async execute(id: string): Promise<IRes> {
    const rulesRepository = new RulesRepository();
    let ruleExists = await rulesRepository.getById(id);
    if (ruleExists) {
     await rulesRepository.remove(id);

     return {
       success: true,
       message: 'rule ' + id + ' removed ',
     }
    } else {
      return {
       success: false,
       message: 'rule ' + id + ' not exists',
     }
    }
  }
}

export default CreateRuleService;
