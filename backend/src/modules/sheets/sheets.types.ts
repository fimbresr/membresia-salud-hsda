import type { PreregistrationInput } from '../preregistrations/preregistration.types.js';

export interface SheetProjectionPayload {
  applicationId: string;
  preregistration: PreregistrationInput;
}

export interface SheetProjectionResult {
  synced: boolean;
  message: string;
  folio?: string;
  source: 'backend' | 'google-sheets';
}
