import { Router } from 'express';

import rulesRouter from './rules.routes';

const routes = Router();

routes.use('/rules', rulesRouter);

export default routes;
