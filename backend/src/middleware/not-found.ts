import type { Request, Response } from 'express';

export function notFoundHandler(request: Request, response: Response) {
  response.status(404).json({
    ok: false,
    error: `Ruta no encontrada: ${request.method} ${request.originalUrl}`,
  });
}
