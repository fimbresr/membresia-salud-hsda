import type { PreRegistrationData } from '../types/app';

const GS_URL =
  'https://script.google.com/macros/s/AKfycbxqh3RQ4O7_7s8Bq0SRBDqVAj70XNr6hbD2eizL-NPVYwUz5oUJjTDnsEyC9M5Za4vt/exec';
const API_URL = `${import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:4000/api/v1'}/preregistrations`;

interface MembershipRegistrationResult {
  ok: boolean;
  message?: string;
  folio?: string;
  registros?: number;
  membresia?: string;
  activacion?: string;
  applicationId?: string;
  participantCount?: number;
  sheetSyncStatus?: string;
  source?: 'backend' | 'google-sheets';
  error?: string;
}

async function sendRegistration(
  url: string,
  data: PreRegistrationData,
): Promise<MembershipRegistrationResult> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = (await response.json()) as MembershipRegistrationResult;

  if (!response.ok || !result.ok) {
    throw new Error(result.error || 'No se pudo registrar la membresia');
  }

  return result;
}

export async function registerMembership(
  data: PreRegistrationData,
): Promise<MembershipRegistrationResult> {
  try {
    return await sendRegistration(API_URL, data);
  } catch (error) {
    if (import.meta.env.DEV) {
      const fallbackResponse = await fetch(GS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      const fallbackResult =
        (await fallbackResponse.json()) as MembershipRegistrationResult;

      if (!fallbackResponse.ok || !fallbackResult.ok) {
        throw error instanceof Error
          ? error
          : new Error('No se pudo registrar la membresia');
      }

      return fallbackResult;
    }

    throw error;
  }
}
