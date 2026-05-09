import { ExportStatus, Prisma, type PrismaClient } from '@prisma/client';
import { env } from '../../config/env.js';
import type { SheetProjectionPayload, SheetProjectionResult } from './sheets.types.js';

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

interface GoogleSheetsResponse {
  ok?: boolean;
  message?: string;
  folio?: string;
  error?: string;
}

export class GoogleSheetsProjectionRepository {
  async projectPreregistration(
    prisma: PrismaExecutor,
    exportId: string,
    payload: SheetProjectionPayload,
  ): Promise<SheetProjectionResult> {
    if (!env.GOOGLE_SHEETS_SCRIPT_URL) {
      await prisma.sheetExport.update({
        where: { id: exportId },
        data: {
          status: ExportStatus.PENDING,
          errorMessage: 'Proyeccion pendiente: GOOGLE_SHEETS_SCRIPT_URL no configurada.',
        },
      });

      return {
        synced: false,
        message: 'La solicitud quedo guardada en backend. La proyeccion a Sheets queda pendiente.',
        source: 'backend',
      };
    }

    const response = await fetch(env.GOOGLE_SHEETS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload.preregistration),
    });

    const result = (await response.json()) as GoogleSheetsResponse;

    if (!response.ok || !result.ok) {
      const message = result.error || 'La exportacion a Google Sheets fallo.';
      await prisma.sheetExport.update({
        where: { id: exportId },
        data: {
          status: ExportStatus.FAILED,
          errorMessage: message,
        },
      });

      return {
        synced: false,
        message,
        source: 'google-sheets',
      };
    }

    await prisma.sheetExport.update({
      where: { id: exportId },
      data: {
        status: ExportStatus.EXPORTED,
        externalReference: result.folio || null,
        exportedAt: new Date(),
        errorMessage: null,
      },
    });

    return {
      synced: true,
      message: result.message || 'Solicitud exportada a Google Sheets.',
      folio: result.folio,
      source: 'google-sheets',
    };
  }
}
