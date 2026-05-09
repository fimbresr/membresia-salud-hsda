import { BadgeCheck, CreditCard, FilePenLine, ShieldCheck } from 'lucide-react';
import type { AppStage } from '../../types/app';

interface OnboardingStepperProps {
  currentStage: AppStage;
}

const orderedStages: Array<{
  stage: Exclude<AppStage, 'membership'>;
  label: string;
  shortLabel: string;
  icon: typeof FilePenLine;
}> = [
  { stage: 'preregistration', label: 'Preregistro', shortLabel: '01', icon: FilePenLine },
  { stage: 'validation', label: 'Validacion', shortLabel: '02', icon: ShieldCheck },
  { stage: 'payment', label: 'Cobro', shortLabel: '03', icon: CreditCard },
  { stage: 'confirmation', label: 'Confirmacion', shortLabel: '04', icon: BadgeCheck },
];

const stageIndexMap = new Map(
  orderedStages.map((item, index) => [item.stage, index]),
);

export function OnboardingStepper({ currentStage }: OnboardingStepperProps) {
  const activeIndex =
    currentStage === 'membership'
      ? orderedStages.length - 1
      : (stageIndexMap.get(currentStage as Exclude<AppStage, 'membership'>) ?? 0);

  return (
    <div
      style={{
        borderRadius: 24,
        border: '1px solid #e3e8f2',
        background: '#ffffff',
        padding: '14px 12px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
        }}
      >
        {orderedStages.map((item, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;
          const Icon = item.icon;

          return (
            <div
              key={item.stage}
              style={{
                borderRadius: 18,
                padding: '10px 8px',
                background: isActive ? '#f3f7fd' : '#fbfcfe',
                border: `1px solid ${
                  isActive ? '#9db6dd' : isComplete ? '#d4dfef' : '#edf1f7'
                }`,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isActive || isComplete ? '#163f82' : '#e9eef5',
                  color: isActive || isComplete ? '#ffffff' : '#7f91ad',
                  marginBottom: 8,
                }}
              >
                {isComplete ? <BadgeCheck size={15} /> : <Icon size={15} />}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: isActive ? '#15345f' : '#617593',
                  fontFamily: '"Avenir Medium", sans-serif',
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  margin: '2px 0 0',
                  fontSize: 10,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isActive ? '#5372a4' : '#9ba8bc',
                }}
              >
                {item.shortLabel}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
