import {
  Bell,
  CheckCircle,
  CircleDollarSign,
  Clock,
  CreditCard,
  FileText,
  Globe,
  Heart,
  HelpCircle,
  Lock,
  MessageCircle,
  Percent,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Star,
  Ticket,
  XCircle,
} from 'lucide-react';
import type {
  BenefitItem,
  MemberProfileData,
  MembershipExperienceData,
  MembershipCardData,
  PreRegistrationData,
  ProfileSection,
  Purchase,
} from '../types/app';

export const memberProfile: MemberProfileData = {
  greetingName: 'Lucy',
  fullName: 'Lucy Hernández',
  email: 'lucy.hdz@correo.com',
  memberCode: 'MEM-2026-8842',
  cashbackBalance: '$850.00',
  cashbackLabel: 'pesos disponibles',
  planName: 'Premium',
};

export const membershipCard: MembershipCardData = {
  userName: memberProfile.fullName,
  memberId: 'ID 1000 2345 6789',
  plan: memberProfile.planName,
  status: 'Activa',
};

export const defaultMembershipExperience: MembershipExperienceData = {
  profile: memberProfile,
  card: membershipCard,
  membershipMode: 'Individual',
  membershipView: 'Individual',
  registeredDependents: [],
};

export function buildMembershipExperience(
  preregistration: PreRegistrationData,
): MembershipExperienceData {
  const registeredDependents = preregistration.dependents.filter(
    (dependent) => dependent.fullName.trim() !== '',
  );
  const holderFirstName =
    preregistration.holder.fullName.trim().split(/\s+/)[0] || 'Paciente';
  const memberCodeSuffix = preregistration.officialIdReference
    .replace(/\s+/g, '')
    .slice(-6)
    .toUpperCase();

  const profile: MemberProfileData = {
    greetingName: holderFirstName,
    fullName: preregistration.holder.fullName || 'Paciente en validación',
    email: preregistration.holder.email || 'pendiente@hsda.mx',
    memberCode: memberCodeSuffix
      ? `MEM-${memberCodeSuffix}`
      : 'MEM-VALIDACION',
    cashbackBalance: '$0.00',
    cashbackLabel: 'saldo inicial en validación',
    planName:
      preregistration.membershipMode === 'Familiar' ? 'Familiar' : 'Individual',
  };

  const card: MembershipCardData = {
    userName: profile.fullName,
    memberId: profile.memberCode,
    plan: preregistration.membershipMode,
    status: 'Activa',
  };

  return {
    profile,
    card,
    membershipMode: preregistration.membershipMode,
    membershipView: preregistration.membershipView,
    registeredDependents,
  };
}

export const benefits: BenefitItem[] = [
  {
    icon: Percent,
    title: 'Descuentos exclusivos',
    detail: 'Hasta 30% en servicios seleccionados',
    fullDesc:
      'Disfruta de descuentos especiales en consultas, estudios de laboratorio y farmacia. Válido en todas las sucursales del Hospital San Diego.',
    highlights: [
      '30% off en consultas generales',
      '20% off en estudios de laboratorio',
      '15% off en farmacia',
    ],
  },
  {
    icon: CircleDollarSign,
    title: 'Cashback en tus compras',
    detail: 'Acumula el 5% de tus compras',
    fullDesc:
      'Cada vez que uses tu membresía en servicios del hospital, acumulas el 5% del monto pagado como cashback canjeable en tu siguiente visita.',
    highlights: [
      '5% de retorno en cada servicio',
      'Sin límite de acumulación',
      'Canjeable al instante',
    ],
  },
  {
    icon: Ticket,
    title: 'Promociones especiales',
    detail: 'Ofertas solo para miembros',
    fullDesc:
      'Acceso anticipado a promociones exclusivas, campañas de salud preventiva y paquetes especiales diseñados solo para miembros activos.',
    highlights: [
      'Acceso anticipado a promos',
      'Paquetes de salud preventiva',
      'Ofertas de temporada',
    ],
  },
  {
    icon: Heart,
    title: 'Atención prioritaria',
    detail: 'Sin filas en mostrador',
    fullDesc:
      'Al presentar tu código QR de membresía, recibirás atención preferencial en mostrador y módulos de atención sin necesidad de hacer fila.',
    highlights: [
      'Pase prioritario en mostrador',
      'Módulo exclusivo para miembros',
      'Tiempo de espera < 5 min',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Cobertura ampliada',
    detail: 'Acceso a especialistas',
    fullDesc:
      'Tu membresía incluye cobertura mejorada en consultas con especialistas, reduciendo significativamente los copagos en cardiología, pediatría y más.',
    highlights: [
      'Acceso a 12+ especialidades',
      'Copagos reducidos hasta 50%',
      'Sin necesidad de referencia',
    ],
  },
  {
    icon: Star,
    title: 'Puntos rewards',
    detail: 'Canjea puntos por servicios',
    fullDesc:
      'Cada peso gastado en servicios del hospital genera puntos rewards que puedes canjear por servicios gratuitos o descuentos adicionales.',
    highlights: [
      '1 punto por cada $10 gastados',
      'Canje por servicios gratis',
      'Puntos sin caducidad',
    ],
  },
];

export const homeBenefits = benefits.slice(0, 3);

export const profileSections: ProfileSection[] = [
  {
    icon: Bell,
    title: 'Notificaciones',
    detail: 'Gestiona tus alertas',
    fullDesc:
      'Configura qué notificaciones deseas recibir y cómo recibirlas.',
    items: [
      { icon: CheckCircle, label: 'Recordatorios de citas', value: 'Activado' },
      { icon: CheckCircle, label: 'Estado de pagos', value: 'Activado' },
      { icon: Bell, label: 'Promociones', value: 'Desactivado' },
    ],
  },
  {
    icon: Shield,
    title: 'Seguridad',
    detail: 'Biometría y contraseña',
    fullDesc:
      'Administra los métodos de autenticación y seguridad de tu cuenta.',
    items: [
      { icon: Lock, label: 'Face ID / Huella dactilar', value: 'Configurado' },
      {
        icon: Lock,
        label: 'Contraseña',
        value: 'Última actualización: hace 30 días',
      },
      {
        icon: Shield,
        label: 'Autenticación de dos factores',
        value: 'Desactivado',
      },
    ],
  },
  {
    icon: CreditCard,
    title: 'Métodos de pago',
    detail: 'Tarjetas guardadas',
    fullDesc: 'Gestiona tus tarjetas y métodos de pago registrados.',
    items: [
      { icon: CreditCard, label: 'Visa terminada en 4521', value: 'Principal' },
      {
        icon: CreditCard,
        label: 'Mastercard terminada en 8903',
        value: 'Secundaria',
      },
    ],
  },
  {
    icon: HelpCircle,
    title: 'Ayuda',
    detail: 'Centro de soporte',
    fullDesc:
      'Obtén ayuda sobre el uso de la app o contacta al soporte del hospital.',
    items: [
      { icon: MessageCircle, label: 'Chat en vivo', value: 'Disponible 24/7' },
      { icon: Globe, label: 'Sitio web del hospital', value: 'hospital.mx' },
      { icon: HelpCircle, label: 'Preguntas frecuentes', value: '12 temas' },
    ],
  },
];

export const purchases: Purchase[] = [
  {
    icon: ShoppingBag,
    title: 'Membresía Premium',
    date: '01 May 2026',
    amount: '$2,500.00',
    status: 'Completado',
    statusIcon: CheckCircle,
    statusColor: '#16a34a',
    fullDesc:
      'Pago de membresía anual Plan Premium. Cobertura completa en todas las especialidades del Hospital San Diego de Alcalá.',
    receiptId: 'REC-2026-001',
  },
  {
    icon: ShoppingBag,
    title: 'Consulta Cardiología',
    date: '20 Abr 2026',
    amount: '$350.00',
    status: 'Completado',
    statusIcon: CheckCircle,
    statusColor: '#16a34a',
    fullDesc:
      'Consulta con Dr. López en la especialidad de Cardiología. Incluye electrocardiograma básico.',
    receiptId: 'REC-2026-002',
  },
  {
    icon: ShoppingBag,
    title: 'Membresía Plus',
    date: '01 Abr 2026',
    amount: '$1,800.00',
    status: 'Completado',
    statusIcon: CheckCircle,
    statusColor: '#16a34a',
    fullDesc: 'Pago de membresía mensual Plan Plus. Renovación automática.',
    receiptId: 'REC-2026-003',
  },
  {
    icon: ShoppingBag,
    title: 'Estudios Laboratorio',
    date: '15 Mar 2026',
    amount: '$120.00',
    status: 'Reembolsado',
    statusIcon: XCircle,
    statusColor: '#dc2626',
    fullDesc:
      'Análisis de sangre completo y perfil lipídico. Reembolso procesado por cobertura del 100%.',
    receiptId: 'REC-2026-004',
  },
  {
    icon: ShoppingBag,
    title: 'Membresía Básica',
    date: '01 Mar 2026',
    amount: '$2,500.00',
    status: 'Pendiente',
    statusIcon: Clock,
    statusColor: '#f59e0b',
    fullDesc:
      'Pago de membresía anual Plan Básico. Pago en proceso de verificación.',
    receiptId: 'REC-2026-005',
  },
];

export const purchaseDetailIcon = FileText;
