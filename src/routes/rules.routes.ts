import { Router } from 'express';

import CreateRuleService from '../services/CreateRulesService';
import GetRulesService from '../services/GetRulesService';
import DeleteRulesService from '../services/DeleteRulesService';

const rulesRouter = Router();

rulesRouter.get('/', async (request, response) => {
  const getRulesService = new GetRulesService();
  return response.json(await getRulesService.executeGetAll());
});

rulesRouter.post('/', async (request, response) => {

  const { type, interval, days } = request.body;

  const createRuleService = new CreateRuleService();
  return response.json(await createRuleService.execute({ type, interval, days }));
});

rulesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteRuleService = new DeleteRulesService();
  return response.json(await deleteRuleService.execute(id));
});

rulesRouter.get('/disp',async (request, response) => {
  const { dateStart, dateEnd } = request.body;
  const getRulesService = new GetRulesService();
  return response.json(await getRulesService.executeGetDisp({ dateStart, dateEnd }));
});


export default rulesRouter;
