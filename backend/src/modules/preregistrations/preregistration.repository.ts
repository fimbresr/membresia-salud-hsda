import {
  AccountStatus,
  ApplicationStatus,
  Gender,
  MembershipMode,
  MembershipViewMode,
  ParticipantRole,
  Prisma,
  UserRole,
  type PrismaClient,
} from '@prisma/client';
import type { PreregistrationInput } from './preregistration.types.js';

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

function mapGender(gender: PreregistrationInput['holder']['gender']): Gender {
  if (gender === 'Femenino') return Gender.FEMALE;
  if (gender === 'Masculino') return Gender.MALE;
  return Gender.UNSPECIFIED;
}

function mapPlanCode(mode: PreregistrationInput['membershipMode']) {
  if (mode === 'Familiar') return 'FAMILY';
  if (mode === 'Grupal') return 'GROUP';
  return 'INDIVIDUAL';
}

function mapViewMode(view: PreregistrationInput['membershipView']) {
  if (view === 'Familiar') return MembershipViewMode.FAMILY;
  if (view === 'Grupal') return MembershipViewMode.GROUP;
  return MembershipViewMode.INDIVIDUAL;
}

function mapMembershipMode(mode: PreregistrationInput['membershipMode']) {
  if (mode === 'Familiar') return MembershipMode.FAMILY;
  if (mode === 'Grupal') return MembershipMode.GROUP;
  return MembershipMode.INDIVIDUAL;
}

function parseBirthDate(value: string) {
  if (!value) return null;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

export async function ensureBasePlans(prisma: PrismaExecutor) {
  const basePlans = [
    {
      code: 'INDIVIDUAL',
      name: 'Membresia Individual',
      mode: MembershipMode.INDIVIDUAL,
      maxParticipants: 1,
      annualCheckups: 1,
    },
    {
      code: 'FAMILY',
      name: 'Membresia Familiar',
      mode: MembershipMode.FAMILY,
      maxParticipants: 4,
      annualCheckups: 2,
    },
    {
      code: 'GROUP',
      name: 'Membresia Grupal',
      mode: MembershipMode.GROUP,
      maxParticipants: 4,
      annualCheckups: 2,
    },
  ] satisfies Array<Prisma.MembershipPlanCreateInput>;

  for (const plan of basePlans) {
    await prisma.membershipPlan.upsert({
      where: { code: plan.code },
      update: {
        name: plan.name,
        mode: plan.mode,
        maxParticipants: plan.maxParticipants,
        annualCheckups: plan.annualCheckups,
      },
      create: plan,
    });
  }
}

export async function createPreregistration(
  prisma: PrismaExecutor,
  input: PreregistrationInput,
) {
  return prisma.$transaction(async (tx) => {
    await ensureBasePlans(tx);

    const plan = await tx.membershipPlan.findUnique({
      where: { code: mapPlanCode(input.membershipMode) },
    });

    if (!plan) {
      throw new Error('No se encontro un plan base para la membresia solicitada.');
    }

    const holder = await tx.person.create({
      data: {
        fullName: input.holder.fullName,
        birthDate: parseBirthDate(input.holder.birthDate),
        gender: mapGender(input.holder.gender),
        phone: input.holder.phone || null,
        email: input.holder.email || null,
      },
    });

    await tx.identityDocument.create({
      data: {
        personId: holder.id,
        documentType: input.officialIdType,
        reference: input.officialIdReference || null,
        fileName: input.officialIdFileName || null,
      },
    });

    await tx.userAccount.upsert({
      where: { email: input.holder.email },
      update: {
        personId: holder.id,
      },
      create: {
        personId: holder.id,
        email: input.holder.email,
        role: UserRole.PATIENT,
        status: AccountStatus.PENDING_ACTIVATION,
      },
    });

    const application = await tx.membershipApplication.create({
      data: {
        holderPersonId: holder.id,
        planId: plan.id,
        preferredView: mapViewMode(input.membershipView),
        status: ApplicationStatus.PENDING_VALIDATION,
        notes: input.notes || null,
        termsAcceptedAt: input.termsAccepted ? new Date() : null,
      },
    });

    await tx.applicationParticipant.create({
      data: {
        applicationId: application.id,
        personId: holder.id,
        role: ParticipantRole.HOLDER,
        sortOrder: 0,
      },
    });

    const filteredDependents = input.dependents.filter(
      (dependent) => dependent.fullName.trim() !== '',
    );

    for (const [index, dependent] of filteredDependents.entries()) {
      const dependentPerson = await tx.person.create({
        data: {
          fullName: dependent.fullName,
          birthDate: parseBirthDate(dependent.birthDate),
          gender: mapGender(dependent.gender),
          phone: dependent.phone || null,
          email: dependent.email || null,
        },
      });

      await tx.applicationParticipant.create({
        data: {
          applicationId: application.id,
          personId: dependentPerson.id,
          role: ParticipantRole.DEPENDENT,
          sortOrder: index + 1,
        },
      });
    }

    const normalizedPayload = {
      holder: input.holder,
      dependents: filteredDependents,
      membershipMode: input.membershipMode,
      membershipView: input.membershipView,
      officialIdType: input.officialIdType,
      officialIdReference: input.officialIdReference,
      officialIdFileName: input.officialIdFileName,
      notes: input.notes,
      termsAccepted: input.termsAccepted,
    };

    const sheetExport = await tx.sheetExport.create({
      data: {
        applicationId: application.id,
        targetDocumentName: 'Membresias HSDA',
        targetSheetName: 'Membresias',
        payloadJson: normalizedPayload,
      },
    });

    return {
      applicationId: application.id,
      sheetExportId: sheetExport.id,
      holderId: holder.id,
      planCode: plan.code,
      planMode: mapMembershipMode(input.membershipMode),
      participantCount: filteredDependents.length + 1,
      payloadForProjection: normalizedPayload,
    };
  });
}
