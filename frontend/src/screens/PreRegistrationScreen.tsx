import React, { useState } from 'react';
import {
  ArrowRight,
  FileBadge2,
  FileText,
  IdCard,
  ShieldCheck,
  Users,
} from 'lucide-react';
import logo from '../assets/logo.png';
import { OnboardingStepper } from '../components/shared/OnboardingStepper';
import type {
  AppStage,
  MembershipMode,
  MembershipView,
  OfficialIdType,
  PreRegistrationData,
  RegistrationPerson,
} from '../types/app';

interface PreRegistrationScreenProps {
  currentStage: AppStage;
  initialData?: PreRegistrationData | null;
  isSubmitting?: boolean;
  submitError?: string;
  submitSuccess?: string;
  onSubmit: (data: PreRegistrationData) => void | Promise<void>;
}

const createBlankPerson = (): RegistrationPerson => ({
  fullName: '',
  birthDate: '',
  gender: 'Femenino',
  phone: '',
  email: '',
});

const defaultForm: PreRegistrationData = {
  membershipMode: 'Individual',
  membershipView: 'Individual',
  holder: createBlankPerson(),
  dependents: [createBlankPerson(), createBlankPerson(), createBlankPerson()],
  officialIdType: 'INE',
  officialIdReference: '',
  officialIdFileName: '',
  notes: '',
  termsAccepted: true,
};

function SectionTitle({
  eyebrow,
  title,
  detail,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  icon?: typeof Users;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 14,
        marginBottom: 18,
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#7d8fa9',
            fontFamily: '"Avenir Medium", sans-serif',
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            margin: '8px 0 0',
            fontSize: 24,
            lineHeight: 1.05,
            color: '#17335d',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            margin: '8px 0 0',
            fontSize: 14,
            lineHeight: 1.55,
            color: '#617593',
            maxWidth: 460,
          }}
        >
          {detail}
        </p>
      </div>
      {Icon && (
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            background: '#f3f6fb',
            color: '#204d91',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={18} />
        </div>
      )}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display: 'block',
        marginBottom: 7,
        fontSize: 11,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        color: '#70829d',
        fontFamily: '"Avenir Medium", sans-serif',
      }}
    >
      {children}
    </label>
  );
}

function BaseField({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: '1px solid #e1e7f0',
        background: '#ffffff',
        padding: '13px 14px',
      }}
    >
      {children}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <BaseField>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            border: 0,
            outline: 'none',
            background: 'transparent',
            fontSize: 15,
            color: '#1a345c',
          }}
        />
      </BaseField>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <BaseField>
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={{
            width: '100%',
            border: 0,
            outline: 'none',
            background: 'transparent',
            fontSize: 15,
            color: '#1a345c',
          }}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </BaseField>
    </div>
  );
}

function ToggleCards<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<{
    value: T;
    title: string;
    detail: string;
  }>;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: options.length === 3 ? '1fr 1fr 1fr' : '1fr 1fr',
          gap: 10,
        }}
      >
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              style={{
                borderRadius: 18,
                border: `1px solid ${active ? '#9db4d8' : '#e2e8f1'}`,
                background: active ? '#f3f7fd' : '#ffffff',
                padding: '14px 13px',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: '#18345d',
                  fontFamily: '"Avenir Medium", sans-serif',
                }}
              >
                {option.title}
              </p>
              <p
                style={{
                  margin: '6px 0 0',
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: '#687d9b',
                }}
              >
                {option.detail}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PersonSection({
  title,
  subtitle,
  person,
  onChange,
  requireContact,
}: {
  title: string;
  subtitle: string;
  person: RegistrationPerson;
  onChange: (next: RegistrationPerson) => void;
  requireContact: boolean;
}) {
  return (
    <section
      style={{
        borderRadius: 22,
        border: '1px solid #e4eaf2',
        background: '#ffffff',
        padding: '18px 16px',
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <p
          style={{
            margin: 0,
            color: '#173660',
            fontSize: 16,
            fontFamily: '"Avenir Medium", sans-serif',
          }}
        >
          {title}
        </p>
        <p
          style={{
            margin: '4px 0 0',
            color: '#6b7f9c',
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        <InputField
          label="Nombre completo"
          value={person.fullName}
          onChange={(value) => onChange({ ...person, fullName: value })}
          placeholder="Nombre y apellidos"
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <InputField
            label="Fecha de nacimiento"
            type="date"
            value={person.birthDate}
            onChange={(value) => onChange({ ...person, birthDate: value })}
          />
          <SelectField
            label="Sexo"
            value={person.gender}
            onChange={(value) =>
              onChange({
                ...person,
                gender: value as RegistrationPerson['gender'],
              })
            }
            options={['Femenino', 'Masculino', 'No especificado']}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <InputField
            label={requireContact ? 'Telefono' : 'Telefono opcional'}
            type="tel"
            value={person.phone}
            onChange={(value) => onChange({ ...person, phone: value })}
            placeholder="662 000 0000"
          />
          <InputField
            label={requireContact ? 'Correo electronico' : 'Correo opcional'}
            type="email"
            value={person.email}
            onChange={(value) => onChange({ ...person, email: value })}
            placeholder="correo@dominio.com"
          />
        </div>
      </div>
    </section>
  );
}

const membershipModeOptions: Array<{
  value: MembershipMode;
  title: string;
  detail: string;
}> = [
  {
    value: 'Individual',
    title: 'Individual',
    detail: 'Un solo titular con beneficios personales.',
  },
  {
    value: 'Familiar',
    title: 'Familiar',
    detail: 'Titular y hasta 3 integrantes adicionales.',
  },
];

const membershipViewOptions: Array<{
  value: MembershipView;
  title: string;
  detail: string;
}> = [
  {
    value: 'Individual',
    title: 'Individual',
    detail: 'Solo el perfil principal en pantalla.',
  },
  {
    value: 'Familiar',
    title: 'Familiar',
    detail: 'La cuenta muestra a todos los usuarios.',
  },
  {
    value: 'Grupal',
    title: 'Grupal',
    detail: 'Cada integrante visualiza su propio perfil.',
  },
];

const PreRegistrationScreen: React.FC<PreRegistrationScreenProps> = ({
  currentStage,
  initialData,
  isSubmitting = false,
  submitError,
  submitSuccess,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<PreRegistrationData>(
    initialData ?? defaultForm,
  );

  const updateField = <K extends keyof PreRegistrationData>(
    key: K,
    value: PreRegistrationData[K],
  ) => {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const updateDependent = (index: number, next: RegistrationPerson) => {
    const dependents = formData.dependents.map((item, itemIndex) =>
      itemIndex === index ? next : item,
    );
    updateField('dependents', dependents);
  };

  const isFamily = formData.membershipMode === 'Familiar';
  const activeDependents = isFamily ? formData.dependents : [];

  return (
    <main
      style={{
        minHeight: '100dvh',
        padding: '22px 16px 32px',
        paddingTop: 'max(22px, env(safe-area-inset-top))',
        background:
          'linear-gradient(180deg, #f7f9fc 0%, #f1f4f8 100%)',
      }}
    >
      <div style={{ maxWidth: 440, margin: '0 auto' }}>
        <section
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16,
            marginBottom: 18,
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#8292aa',
                fontFamily: '"Avenir Medium", sans-serif',
              }}
            >
              Hospital San Diego de Alcala
            </p>
            <h1
              style={{
                margin: '10px 0 0',
                fontSize: 34,
                lineHeight: 0.98,
                color: '#172f54',
                maxWidth: 290,
              }}
            >
              Preregistro de membresia
            </h1>
            <p
              style={{
                margin: '12px 0 0',
                fontSize: 14,
                lineHeight: 1.6,
                color: '#627592',
                maxWidth: 320,
              }}
            >
              Un flujo mas claro para registrar titular, integrantes y
              documentacion antes de pasar a validacion y cobro.
            </p>
          </div>

          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              border: '1px solid #e0e6ef',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <img
              src={logo}
              alt="Hospital San Diego de Alcala"
              style={{ width: '72%', height: '72%', objectFit: 'contain' }}
            />
          </div>
        </section>

        <div style={{ marginBottom: 18 }}>
          <OnboardingStepper currentStage={currentStage} />
        </div>

        <section
          style={{
            borderRadius: 28,
            border: '1px solid #e2e8f1',
            background: '#ffffff',
            padding: '22px 18px',
            boxShadow: '0 10px 30px rgba(21, 39, 72, 0.04)',
          }}
        >
          <SectionTitle
            eyebrow="Preregistro comercial"
            title="Alta individual o familiar"
            detail="Define la modalidad de la membresia y captura la informacion base del titular. Si la membresia es familiar, podras agregar hasta tres integrantes."
            icon={Users}
          />

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await onSubmit(formData);
            }}
          >
            <div style={{ display: 'grid', gap: 16 }}>
              {submitError && (
                <div
                  style={{
                    borderRadius: 18,
                    border: '1px solid #f0c6c6',
                    background: '#fff6f6',
                    color: '#9f2f2f',
                    padding: '14px 16px',
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div
                  style={{
                    borderRadius: 18,
                    border: '1px solid #cfe3d1',
                    background: '#f6fbf6',
                    color: '#2d6a38',
                    padding: '14px 16px',
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  {submitSuccess}
                </div>
              )}

              <ToggleCards
                label="Tipo de membresia"
                value={formData.membershipMode}
                options={membershipModeOptions}
                onChange={(value) => updateField('membershipMode', value)}
              />

              <ToggleCards
                label="Visualizacion en la app"
                value={formData.membershipView}
                options={membershipViewOptions}
                onChange={(value) => updateField('membershipView', value)}
              />

              <PersonSection
                title="Titular"
                subtitle="Telefono y correo son obligatorios para el titular de la membresia."
                person={formData.holder}
                onChange={(next) => updateField('holder', next)}
                requireContact
              />

              {isFamily && (
                <section
                  style={{
                    borderRadius: 24,
                    border: '1px solid #e6ebf2',
                    background: '#fbfcfe',
                    padding: '18px 16px',
                  }}
                >
                  <SectionTitle
                    eyebrow="Integrantes"
                    title="Membresia familiar"
                    detail="Completa solo los integrantes que realmente seran asociados. Telefono y correo son opcionales para ellos."
                    icon={Users}
                  />

                  <div style={{ display: 'grid', gap: 12 }}>
                    {activeDependents.map((dependent, index) => (
                      <PersonSection
                        key={`dependent-${index}`}
                        title={`Integrante ${index + 1}`}
                        subtitle="Puedes dejar el bloque vacio si aun no registraras a esa persona."
                        person={dependent}
                        onChange={(next) => updateDependent(index, next)}
                        requireContact={false}
                      />
                    ))}
                  </div>
                </section>
              )}

              <section
                style={{
                  borderRadius: 24,
                  border: '1px solid #e4eaf2',
                  background: '#ffffff',
                  padding: '18px 16px',
                }}
              >
                <SectionTitle
                  eyebrow="Documentacion"
                  title="Identificacion del titular"
                  detail="Selecciona el tipo de documento oficial y registra la referencia del archivo antes de enviarlo a validacion."
                  icon={IdCard}
                />

                <div style={{ display: 'grid', gap: 12 }}>
                  <ToggleCards
                    label="Tipo de identificacion"
                    value={formData.officialIdType}
                    options={[
                      {
                        value: 'INE' as OfficialIdType,
                        title: 'INE',
                        detail: 'Credencial para votar vigente.',
                      },
                      {
                        value: 'Licencia de conducir' as OfficialIdType,
                        title: 'Licencia',
                        detail: 'Documento de conducir vigente.',
                      },
                    ]}
                    onChange={(value) => updateField('officialIdType', value)}
                  />

                  <InputField
                    label="Folio o referencia"
                    value={formData.officialIdReference}
                    onChange={(value) => updateField('officialIdReference', value)}
                    placeholder="Numero del documento"
                  />

                  <div>
                    <FieldLabel>Archivo adjunto</FieldLabel>
                    <BaseField>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 12,
                          flexWrap: 'wrap',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: 12,
                              background: '#f3f6fb',
                              color: '#264e8f',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <IdCard size={16} />
                          </div>
                          <div>
                            <p
                              style={{
                                margin: 0,
                                fontSize: 14,
                                color: '#18345d',
                                fontFamily: '"Avenir Medium", sans-serif',
                              }}
                            >
                              {formData.officialIdFileName || 'Sin archivo seleccionado'}
                            </p>
                            <p
                              style={{
                                margin: '2px 0 0',
                                fontSize: 12,
                                color: '#73859f',
                              }}
                            >
                              PDF o imagen
                            </p>
                          </div>
                        </div>
                        <label
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            borderRadius: 14,
                            padding: '10px 12px',
                            border: '1px solid #dce4ef',
                            background: '#f8fafc',
                            color: '#173660',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontFamily: '"Avenir Medium", sans-serif',
                          }}
                        >
                          <FileBadge2 size={15} />
                          Seleccionar
                          <input
                            type="file"
                            accept=".pdf,image/*"
                            style={{ display: 'none' }}
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              updateField('officialIdFileName', file?.name ?? '');
                            }}
                          />
                        </label>
                      </div>
                    </BaseField>
                  </div>
                </div>
              </section>

              <section
                style={{
                  borderRadius: 24,
                  border: '1px solid #e4eaf2',
                  background: '#ffffff',
                  padding: '18px 16px',
                }}
              >
                <SectionTitle
                  eyebrow="Notas"
                  title="Observaciones de captura"
                  detail="Deja comentarios operativos para administracion o para seguimiento comercial."
                  icon={FileText}
                />

                <BaseField>
                  <textarea
                    value={formData.notes}
                    onChange={(event) => updateField('notes', event.target.value)}
                    placeholder="Comentarios internos, dudas del paciente o notas para seguimiento."
                    rows={4}
                    style={{
                      width: '100%',
                      border: 0,
                      outline: 'none',
                      background: 'transparent',
                      fontSize: 15,
                      color: '#1a345c',
                      resize: 'vertical',
                    }}
                  />
                </BaseField>
              </section>

              <div
                style={{
                  borderRadius: 22,
                  border: '1px solid #e5ebf4',
                  background: '#fafbfd',
                  padding: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 12,
                      background: '#f1f5fb',
                      color: '#1c4d96',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ShieldCheck size={17} />
                  </div>
                  <div>
                    <p
                      style={{
                        margin: 0,
                        color: '#18345d',
                        fontSize: 14,
                        fontFamily: '"Avenir Medium", sans-serif',
                      }}
                    >
                      Lo que sigue despues del envio
                    </p>
                    <p
                      style={{
                        margin: '4px 0 0',
                        color: '#6a7f9b',
                        fontSize: 13,
                        lineHeight: 1.55,
                      }}
                    >
                      El preregistro avanza por validacion, cobro y confirmacion.
                      Solo al finalizar esas etapas se activa la segunda interfaz de
                      la membresia.
                    </p>
                  </div>
                </div>
              </div>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  color: '#667a98',
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(event) =>
                    updateField('termsAccepted', event.target.checked)
                  }
                  style={{ marginTop: 2 }}
                />
                Confirmo que la informacion fue capturada con autorizacion del
                titular y que permanecera pendiente hasta validacion
                administrativa, cobro y confirmacion final.
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  border: 0,
                  borderRadius: 18,
                  padding: '16px 18px',
                  background: isSubmitting ? '#7f92b2' : '#163f82',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  cursor: isSubmitting ? 'wait' : 'pointer',
                  fontFamily: '"Avenir Medium", sans-serif',
                  fontSize: 15,
                  opacity: isSubmitting ? 0.92 : 1,
                }}
              >
                {isSubmitting ? 'Enviando a Sheets...' : 'Continuar a validacion'}
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default PreRegistrationScreen;
