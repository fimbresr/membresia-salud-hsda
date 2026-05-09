import { Router } from 'express';
import { preregistrationRouter } from '../modules/preregistrations/preregistration.routes.js';

export const apiRouter = Router();

apiRouter.get('/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'hsda-memberships-backend',
    timestamp: new Date().toISOString(),
  });
});

apiRouter.use('/preregistrations', preregistrationRouter);
