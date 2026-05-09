import {
  BenefitValueType,
  MembershipMode,
  PrismaClient,
} from '@prisma/client';

const prisma = new PrismaClient();

const plans = [
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
];

const benefits = [
  {
    code: 'CONSULTA',
    name: 'Consulta urgencias 24/7',
    description: 'Consulta ilimitada en el servicio de urgencias 24/7.',
    valueType: BenefitValueType.TEXT,
    sheetColumnKey: 'CONSULTA',
  },
  {
    code: 'DESC_LABORATORIO',
    name: 'Descuento laboratorio',
    description: 'Descuento en estudios de laboratorio.',
    valueType: BenefitValueType.PERCENTAGE,
    sheetColumnKey: 'DESC. LABORATORIO',
  },
  {
    code: 'DESC_CIRUGIA',
    name: 'Descuento cirugia',
    description: 'Descuento en hospitalizacion por cirugia.',
    valueType: BenefitValueType.PERCENTAGE,
    sheetColumnKey: 'DESC. CIRUGIA',
  },
  {
    code: 'CHECKUP_BASICO',
    name: 'Check-up basico anual',
    description:
      'Incluye examen general de orina, quimica sanguinea y biometria hematica.',
    valueType: BenefitValueType.COUNT,
    sheetColumnKey: 'CHECK-UP',
  },
  {
    code: 'DESC_IMAGEN',
    name: 'Descuento imagenologia',
    description: 'Descuento en estudios de imagenologia.',
    valueType: BenefitValueType.PERCENTAGE,
    sheetColumnKey: 'DESC. IMAGEN',
  },
  {
    code: 'DESC_FARMACIA',
    name: 'Descuento farmacia',
    description: 'Descuento en farmacia 24/7.',
    valueType: BenefitValueType.PERCENTAGE,
    sheetColumnKey: 'DESC. FARMACIA',
  },
  {
    code: 'DESC_NUVIT',
    name: 'Descuento Nuvit',
    description: 'Descuento en productos Nuvit.',
    valueType: BenefitValueType.PERCENTAGE,
    sheetColumnKey: 'DESC.NUVIT',
  },
  {
    code: 'TRASLADO_AMBULANCIA',
    name: 'Traslado de ambulancia',
    description: 'Un traslado anual casa-hospital u hospital-casa.',
    valueType: BenefitValueType.TEXT,
    sheetColumnKey: 'TRASLADO',
  },
  {
    code: 'UPGRADE_HOSPITALARIO',
    name: 'Upgrade hospitalario',
    description:
      'Trato preferencial con upgrade de habitacion sujeto a disponibilidad y kit de bienvenida.',
    valueType: BenefitValueType.BOOLEAN,
    sheetColumnKey: 'UPGRADE',
  },
  {
    code: 'COMIDA_ACOMPANANTE',
    name: 'Comida para acompanante',
    description: 'Una comida gratuita para un acompanante durante hospitalizacion.',
    valueType: BenefitValueType.COUNT,
    sheetColumnKey: 'COMIDA',
  },
  {
    code: 'DESC_NEUROPEDIATRIA',
    name: 'Descuento neuropediatria',
    description: 'Descuento en valoracion inicial de neuropediatria.',
    valueType: BenefitValueType.PERCENTAGE,
    sheetColumnKey: 'DESC. NEUROPEDIATRIA',
  },
  {
    code: 'DESC_PSICOLOGIA',
    name: 'Descuento psicologia',
    description: 'Descuento en consulta de primera vez en psicologia.',
    valueType: BenefitValueType.PERCENTAGE,
    sheetColumnKey: 'DESC. PSICOLOGIA',
  },
  {
    code: 'DESC_PSICOLOGO',
    name: 'Descuento valoracion psiquiatra y psicologo',
    description:
      'Descuento en valoracion inicial con psiquiatra y psicologo.',
    valueType: BenefitValueType.PERCENTAGE,
    sheetColumnKey: 'DESC. PSICOLOGO',
  },
  {
    code: 'DESC_NUTRICION',
    name: 'Descuento nutricion',
    description: 'Descuento en consulta de nutricion.',
    valueType: BenefitValueType.PERCENTAGE,
    sheetColumnKey: 'DESC. NUTRICION',
  },
  {
    code: 'DESC_PESO',
    name: 'Descuento medicina general y control de peso',
    description:
      'Descuento en consulta de primera vez en medicina general y control de peso.',
    valueType: BenefitValueType.PERCENTAGE,
    sheetColumnKey: 'DESC. PESO',
  },
];

const planBenefits: Record<string, Record<string, { valueText?: string; valueNumber?: number }>> = {
  INDIVIDUAL: {
    CONSULTA: { valueText: 'Ilimitada 24/7' },
    DESC_LABORATORIO: { valueNumber: 15 },
    DESC_CIRUGIA: { valueNumber: 15 },
    CHECKUP_BASICO: { valueNumber: 1 },
    DESC_IMAGEN: { valueNumber: 10 },
    DESC_FARMACIA: { valueNumber: 10 },
    DESC_NUVIT: { valueNumber: 10 },
    TRASLADO_AMBULANCIA: { valueText: '1 anual' },
    UPGRADE_HOSPITALARIO: { valueText: 'SI' },
    COMIDA_ACOMPANANTE: { valueNumber: 1 },
    DESC_NEUROPEDIATRIA: { valueNumber: 15 },
    DESC_PSICOLOGIA: { valueNumber: 10 },
    DESC_PSICOLOGO: { valueNumber: 15 },
    DESC_NUTRICION: { valueNumber: 10 },
    DESC_PESO: { valueNumber: 20 },
  },
  FAMILY: {
    CONSULTA: { valueText: 'Ilimitada 24/7' },
    DESC_LABORATORIO: { valueNumber: 15 },
    DESC_CIRUGIA: { valueNumber: 15 },
    CHECKUP_BASICO: { valueNumber: 2 },
    DESC_IMAGEN: { valueNumber: 10 },
    DESC_FARMACIA: { valueNumber: 10 },
    DESC_NUVIT: { valueNumber: 10 },
    TRASLADO_AMBULANCIA: { valueText: '1 anual' },
    UPGRADE_HOSPITALARIO: { valueText: 'SI' },
    COMIDA_ACOMPANANTE: { valueNumber: 1 },
    DESC_NEUROPEDIATRIA: { valueNumber: 15 },
    DESC_PSICOLOGIA: { valueNumber: 10 },
    DESC_PSICOLOGO: { valueNumber: 15 },
    DESC_NUTRICION: { valueNumber: 10 },
    DESC_PESO: { valueNumber: 20 },
  },
  GROUP: {
    CONSULTA: { valueText: 'Ilimitada 24/7' },
    DESC_LABORATORIO: { valueNumber: 15 },
    DESC_CIRUGIA: { valueNumber: 15 },
    CHECKUP_BASICO: { valueNumber: 2 },
    DESC_IMAGEN: { valueNumber: 10 },
    DESC_FARMACIA: { valueNumber: 10 },
    DESC_NUVIT: { valueNumber: 10 },
    TRASLADO_AMBULANCIA: { valueText: '1 anual' },
    UPGRADE_HOSPITALARIO: { valueText: 'SI' },
    COMIDA_ACOMPANANTE: { valueNumber: 1 },
    DESC_NEUROPEDIATRIA: { valueNumber: 15 },
    DESC_PSICOLOGIA: { valueNumber: 10 },
    DESC_PSICOLOGO: { valueNumber: 15 },
    DESC_NUTRICION: { valueNumber: 10 },
    DESC_PESO: { valueNumber: 20 },
  },
};

async function main() {
  for (const plan of plans) {
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

  for (const benefit of benefits) {
    await prisma.benefitCatalog.upsert({
      where: { code: benefit.code },
      update: {
        name: benefit.name,
        description: benefit.description,
        valueType: benefit.valueType,
        sheetColumnKey: benefit.sheetColumnKey,
      },
      create: benefit,
    });
  }

  for (const plan of plans) {
    const persistedPlan = await prisma.membershipPlan.findUniqueOrThrow({
      where: { code: plan.code },
    });

    for (const [benefitCode, assignment] of Object.entries(planBenefits[plan.code])) {
      const benefit = await prisma.benefitCatalog.findUniqueOrThrow({
        where: { code: benefitCode },
      });

      await prisma.planBenefit.upsert({
        where: {
          planId_benefitId: {
            planId: persistedPlan.id,
            benefitId: benefit.id,
          },
        },
        update: {
          valueText: assignment.valueText ?? null,
          valueNumber: assignment.valueNumber ?? null,
        },
        create: {
          planId: persistedPlan.id,
          benefitId: benefit.id,
          valueText: assignment.valueText ?? null,
          valueNumber: assignment.valueNumber ?? null,
          isHighlighted: true,
        },
      });
    }
  }

  console.log('Seed inicial de planes y beneficios HSDA completado.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
