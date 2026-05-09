import { z } from 'zod';

export const registrationPersonSchema = z.object({
  fullName: z.string().trim().min(1, 'El nombre completo es obligatorio'),
  birthDate: z.string().trim().optional().default(''),
  gender: z.enum(['Femenino', 'Masculino', 'No especificado']),
  phone: z.string().trim().optional().default(''),
  email: z.string().trim().email('Correo invalido').or(z.literal('')),
});

export const preregistrationSchema = z.object({
  membershipMode: z.enum(['Individual', 'Familiar', 'Grupal']),
  membershipView: z.enum(['Individual', 'Familiar', 'Grupal']),
  holder: registrationPersonSchema.extend({
    phone: z.string().trim().min(1, 'El telefono del titular es obligatorio'),
    email: z.string().trim().email('El correo del titular es obligatorio'),
  }),
  dependents: z.array(registrationPersonSchema).default([]),
  officialIdType: z.enum(['INE', 'Licencia de conducir']),
  officialIdReference: z.string().trim().optional().default(''),
  officialIdFileName: z.string().trim().optional().default(''),
  notes: z.string().trim().optional().default(''),
  termsAccepted: z.boolean().refine((value) => value, {
    message: 'Debes aceptar terminos y condiciones',
  }),
});

export type PreregistrationInput = z.infer<typeof preregistrationSchema>;
