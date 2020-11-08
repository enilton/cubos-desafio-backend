import { Router } from 'express';

import CreateRuleService from '../services/CreateRulesService';
import GetRulesService from '../services/GetRulesService';
import DeleteRulesService from '../services/DeleteRulesService';

const rulesRouter = Router();

rulesRouter.get('/', async (request, response) => {
  const getRulesService = new GetRulesService();
  return response.json(await getRulesService.execute());
});

rulesRouter.post('/', async (request, response) => {

  const { type, interval } = request.body;

  const createRuleService = new CreateRuleService();
  return response.json(await createRuleService.execute({ type, interval }));
});

rulesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteRuleService = new DeleteRulesService();
  return response.json(await deleteRuleService.execute(id));
});



export default rulesRouter;
