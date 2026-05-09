import type { LucideIcon } from 'lucide-react';

export type MembershipStatus = 'Activa' | 'Inactiva';
export type PurchaseStatus = 'Completado' | 'Pendiente' | 'Reembolsado';
export type AppStage =
  | 'preregistration'
  | 'validation'
  | 'payment'
  | 'confirmation'
  | 'membership';
export type MembershipMode = 'Individual' | 'Familiar';
export type MembershipView = 'Individual' | 'Familiar' | 'Grupal';
export type PersonGender = 'Femenino' | 'Masculino' | 'No especificado';
export type OfficialIdType = 'INE' | 'Licencia de conducir';

export interface RegistrationPerson {
  fullName: string;
  birthDate: string;
  gender: PersonGender;
  phone: string;
  email: string;
}

export interface PreRegistrationData {
  membershipMode: MembershipMode;
  membershipView: MembershipView;
  holder: RegistrationPerson;
  dependents: RegistrationPerson[];
  officialIdType: OfficialIdType;
  officialIdReference: string;
  officialIdFileName: string;
  notes: string;
  termsAccepted: boolean;
}

export interface MembershipCardData {
  userName: string;
  memberId: string;
  plan: string;
  status: MembershipStatus;
}

export interface MembershipExperienceData {
  profile: MemberProfileData;
  card: MembershipCardData;
  membershipMode: MembershipMode;
  membershipView: MembershipView;
  registeredDependents: RegistrationPerson[];
}

export interface MemberProfileData {
  greetingName: string;
  fullName: string;
  email: string;
  memberCode: string;
  cashbackBalance: string;
  cashbackLabel: string;
  planName: string;
}

export interface BenefitItem {
  icon: LucideIcon;
  title: string;
  detail: string;
  fullDesc: string;
  highlights: string[];
}

export interface DetailListItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface ProfileSection {
  icon: LucideIcon;
  title: string;
  detail: string;
  fullDesc: string;
  items: DetailListItem[];
}

export interface Purchase {
  icon: LucideIcon;
  title: string;
  date: string;
  amount: string;
  status: PurchaseStatus;
  statusIcon: LucideIcon;
  statusColor: string;
  fullDesc: string;
  receiptId: string;
}
