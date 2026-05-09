import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HttpError } from '../lib/http-error.js';

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (error instanceof HttpError) {
    response.status(error.statusCode).json({
      ok: false,
      error: error.message,
      details: error.details,
    });
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      ok: false,
      error: 'La solicitud contiene datos invalidos.',
      details: error.flatten(),
    });
    return;
  }

  console.error(error);

  response.status(500).json({
    ok: false,
    error: 'Ocurrio un error interno en el servidor.',
  });
}
