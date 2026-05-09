import { Router } from 'express';
import { createPreregistrationController } from './preregistration.controller.js';

export const preregistrationRouter = Router();

preregistrationRouter.post('/', createPreregistrationController);
