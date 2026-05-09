import { prisma } from '../../lib/prisma.js';
import { GoogleSheetsProjectionRepository } from '../sheets/sheets.repository.js';
import type { PreregistrationInput } from './preregistration.types.js';
import { createPreregistration } from './preregistration.repository.js';

const sheetsProjectionRepository = new GoogleSheetsProjectionRepository();

export async function registerPreregistration(input: PreregistrationInput) {
  const created = await createPreregistration(prisma, input);

  const projection = await sheetsProjectionRepository.projectPreregistration(
    prisma,
    created.sheetExportId,
    {
      applicationId: created.applicationId,
      preregistration: input,
    },
  );

  return {
    ok: true,
    applicationId: created.applicationId,
    participantCount: created.participantCount,
    status: 'PENDING_VALIDATION',
    sheetSyncStatus: projection.synced ? 'EXPORTED' : 'PENDING',
    folio: projection.folio,
    message: projection.message,
    source: projection.source,
  };
}
