import React from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  Clock3,
  CreditCard,
  FileCheck2,
  ShieldEllipsis,
  Users,
} from 'lucide-react';
import { OnboardingStepper } from '../components/shared/OnboardingStepper';
import type { AppStage, PreRegistrationData } from '../types/app';

interface PendingApprovalScreenProps {
  currentStage: AppStage;
  data: PreRegistrationData;
  onBack: () => void;
  onContinue: () => void;
}

const PendingApprovalScreen: React.FC<PendingApprovalScreenProps> = ({
  currentStage,
  data,
  onBack,
  onContinue,
}) => {
  const registeredDependents = data.dependents.filter(
    (dependent) => dependent.fullName.trim() !== '',
  );

  const stageConfig: Record<
    Exclude<AppStage, 'preregistration' | 'membership'>,
    {
      badge: string;
      title: string;
      description: string;
      icon: typeof Clock3;
      summaryTitle: string;
      cta: string;
      checklist: Array<{
        icon: typeof BadgeCheck;
        title: string;
        text: string;
      }>;
    }
  > = {
    validation: {
      badge: 'Validación en curso',
      title: 'Administración está revisando el preregistro',
      description:
        'Se verifican los datos del titular, integrantes y documentación oficial antes de aprobar el proceso comercial.',
      icon: ShieldEllipsis,
      summaryTitle: 'Resumen para validación',
      cta: 'Continuar a cobro',
      checklist: [
        {
          icon: BadgeCheck,
          title: 'Datos capturados',
          text: 'La información del titular y los integrantes ya está lista para revisión.',
        },
        {
          icon: ShieldEllipsis,
          title: 'Revisión documental',
          text: 'Se valida identificación oficial, modalidad de membresía y datos obligatorios.',
        },
      ],
    },
    payment: {
      badge: 'Cobro pendiente',
      title: 'Cobro de membresía listo para validarse',
      description:
        'Una vez autorizada la validación, el siguiente paso es confirmar el cobro correspondiente a la membresía individual o familiar.',
      icon: CreditCard,
      summaryTitle: 'Resumen para cobro',
      cta: 'Marcar cobro como validado',
      checklist: [
        {
          icon: CreditCard,
          title: 'Cobro en revisión',
          text: 'Se confirma el pago y se asocia al titular para habilitar la activación.',
        },
        {
          icon: BadgeCheck,
          title: 'Registro comercial',
          text: 'La membresía queda lista para pasar a la etapa final de confirmación.',
        },
      ],
    },
    confirmation: {
      badge: 'Confirmación final',
      title: 'Todo está listo para activar la membresía',
      description:
        'La validación administrativa y el cobro ya fueron cubiertos. Solo falta confirmar para abrir la segunda interfaz de la membresía.',
      icon: FileCheck2,
      summaryTitle: 'Resumen de activación',
      cta: 'Activar interfaz de membresía',
      checklist: [
        {
          icon: BadgeCheck,
          title: 'Validación aprobada',
          text: 'La documentación y elegibilidad del titular fueron confirmadas.',
        },
        {
          icon: CreditCard,
          title: 'Cobro validado',
          text: 'El pago quedó asociado al expediente para activar beneficios y cashback.',
        },
      ],
    },
  };

  const config = stageConfig[currentStage as Exclude<AppStage, 'preregistration' | 'membership'>];
  const StageIcon = config.icon;

  return (
    <main
      style={{
        minHeight: '100dvh',
        padding: '22px 16px 28px',
        paddingTop: 'max(22px, env(safe-area-inset-top))',
        background:
          'radial-gradient(circle at top left, rgba(231,241,255,0.92), transparent 30%), linear-gradient(180deg, #f5f9ff 0%, #eff3f9 100%)',
      }}
    >
      <div style={{ maxWidth: 440, margin: '0 auto' }}>
        <section
          style={{
            borderRadius: 34,
            background:
              'linear-gradient(145deg, rgba(10,44,95,0.96) 0%, rgba(22,73,144,0.95) 100%)',
            color: '#ffffff',
            padding: '24px 22px',
            boxShadow: '0 24px 48px rgba(20, 48, 92, 0.2)',
          }}
        >
          <div style={{ marginBottom: 18 }}>
            <OnboardingStepper currentStage={currentStage} />
          </div>

          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 18,
              background: 'rgba(255,255,255,0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StageIcon size={28} />
          </div>

          <p
            style={{
              margin: '18px 0 0',
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.72)',
              fontFamily: '"Avenir Medium", sans-serif',
            }}
          >
            {config.badge}
          </p>
          <h1 style={{ margin: '10px 0 0', fontSize: 28, lineHeight: 1.05 }}>
            {config.title}
          </h1>
          <p
            style={{
              margin: '12px 0 0',
              fontSize: 14,
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.82)',
            }}
          >
            {data.holder.fullName || 'El titular'} se encuentra en la etapa de{' '}
            {config.badge.toLowerCase()} antes de habilitar la interfaz de la
            membresía.
          </p>
        </section>

        <section
          style={{
            marginTop: -18,
            position: 'relative',
            zIndex: 1,
            borderRadius: 30,
            background: '#ffffff',
            border: '1px solid #dde8f8',
            padding: '22px 18px',
            boxShadow: '0 20px 45px rgba(18, 43, 89, 0.08)',
          }}
        >
          <div
            style={{
              borderRadius: 24,
              background: '#f4f8ff',
              border: '1px solid #dbe7fb',
              padding: '16px',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#5f739b',
              fontFamily: '"Avenir Medium", sans-serif',
            }}
          >
            {config.summaryTitle}
          </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                marginTop: 12,
              }}
            >
              {[
                ['Titular', data.holder.fullName || 'Pendiente'],
                ['Membresía', data.membershipMode],
                ['Visualización', data.membershipView],
                ['Integrantes', `${registeredDependents.length}`],
                ['Correo titular', data.holder.email || 'Pendiente'],
                ['Identificación', data.officialIdType],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    borderRadius: 18,
                    background: '#ffffff',
                    border: '1px solid #e5edf9',
                    padding: '12px 14px',
                  }}
                >
                  <p style={{ margin: 0, fontSize: 12, color: '#6a7da3' }}>
                    {label}
                  </p>
                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: 14,
                      color: '#18335f',
                      fontFamily: '"Avenir Medium", sans-serif',
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {registeredDependents.length > 0 && (
            <div
              style={{
                marginTop: 14,
                borderRadius: 22,
                border: '1px solid #e4ebf7',
                background: '#ffffff',
                padding: '14px 14px 10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    background: '#edf4ff',
                    color: '#1e5bb1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Users size={18} />
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: '#18335f',
                      fontFamily: '"Avenir Medium", sans-serif',
                    }}
                  >
                    Integrantes capturados
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: '#60749c' }}>
                    Personas adicionales incluidas en la membresía familiar.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gap: 8 }}>
                {registeredDependents.map((dependent, index) => (
                  <div
                    key={`${dependent.fullName}-${index}`}
                    style={{
                      borderRadius: 16,
                      background: '#f7faff',
                      border: '1px solid #e6eefb',
                      padding: '12px 14px',
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        color: '#18335f',
                        fontFamily: '"Avenir Medium", sans-serif',
                      }}
                    >
                      {dependent.fullName}
                    </p>
                    <p
                      style={{
                        margin: '4px 0 0',
                        fontSize: 12,
                        color: '#60749c',
                      }}
                    >
                      {dependent.birthDate || 'Fecha pendiente'} · {dependent.gender}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
            {config.checklist.map((item) => (
              <div
                key={item.title}
                style={{
                  display: 'flex',
                  gap: 12,
                  borderRadius: 22,
                  border: '1px solid #e8eef8',
                  background: '#ffffff',
                  padding: '14px 14px 14px 16px',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 14,
                    background: '#edf4ff',
                    color: '#1e5bb1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <item.icon size={18} />
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: '#18335f',
                      fontFamily: '"Avenir Medium", sans-serif',
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      margin: '4px 0 0',
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: '#60749c',
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
            <button
              onClick={onBack}
              style={{
                width: '100%',
                borderRadius: 20,
                border: '1px solid #d9e5f8',
                background: '#ffffff',
                color: '#163a73',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                cursor: 'pointer',
                fontFamily: '"Avenir Medium", sans-serif',
              }}
            >
              <ArrowLeft size={17} />
              Regresar al paso anterior
            </button>
            <button
              onClick={onContinue}
              style={{
                width: '100%',
                border: 0,
                borderRadius: 20,
                background:
                  'linear-gradient(135deg, #0f3d82 0%, #1d63c1 60%, #3d95ff 100%)',
                color: '#ffffff',
                padding: '16px 18px',
                boxShadow: '0 18px 28px rgba(28, 90, 175, 0.22)',
                cursor: 'pointer',
                fontFamily: '"Avenir Medium", sans-serif',
              }}
            >
              {config.cta}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PendingApprovalScreen;
