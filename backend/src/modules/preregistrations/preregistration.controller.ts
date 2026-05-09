import type { Request, Response } from 'express';
import { preregistrationSchema } from './preregistration.types.js';
import { registerPreregistration } from './preregistration.service.js';

export async function createPreregistrationController(
  request: Request,
  response: Response,
) {
  const payload = preregistrationSchema.parse(request.body);
  const result = await registerPreregistration(payload);

  response.status(201).json(result);
}
