import React, { useState } from 'react';
import { DetailView } from '../components/shared/DetailView';
import { InteractiveList } from '../components/shared/InteractiveList';
import { benefits } from '../data/mockData';
import { useSwipeBack } from '../hooks/useSwipeBack';
import type { MembershipExperienceData } from '../types/app';

interface BenefitsScreenProps {
  membershipExperience: MembershipExperienceData;
}

const BenefitsScreen: React.FC<BenefitsScreenProps> = ({ membershipExperience }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const swipeHandlers = useSwipeBack({ onSwipeBack: () => setSelectedIndex(null) });
  const { profile, membershipMode } = membershipExperience;

  if (selectedIndex !== null) {
    const benefit = benefits[selectedIndex];
    return (
      <div {...swipeHandlers}>
        <DetailView
          title={benefit.title}
          subtitle={benefit.detail}
          description={benefit.fullDesc}
          icon={benefit.icon}
          backLabel="Mis Beneficios"
          onBack={() => setSelectedIndex(null)}
          highlights={benefit.highlights}
        />
      </div>
    );
  }

  return (
    <>
      <div>
        <p
          style={{
            margin: 0,
            fontFamily: '"Avenir Medium", sans-serif',
            fontSize: 18,
            color: '#14346e',
          }}
        >
          {profile.fullName}
        </p>
        <h1
          style={{
            margin: '4px 0 0',
            fontSize: 18,
            lineHeight: 1.1,
            color: '#25385f',
            fontFamily: '"Avenir Light", sans-serif',
            fontWeight: 300,
          }}
        >
          Mis Beneficios
        </h1>
      </div>

      <div
        style={{
          marginTop: 18,
          borderRadius: 24,
          background: 'linear-gradient(135deg, #004a8f 0%, #00a3e0 100%)',
          padding: '20px',
          color: '#ffffff',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 13,
            opacity: 0.85,
            fontFamily: '"Avenir Medium", sans-serif',
          }}
        >
          Membresía {profile.planName}
        </p>
        <p
          style={{
            margin: '8px 0 0',
            fontFamily: '"Avenir Black", sans-serif',
            fontSize: 28,
            lineHeight: 1,
          }}
        >
          {benefits.length}
        </p>
        <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.85 }}>
          beneficios activos para plan {membershipMode.toLowerCase()}
        </p>
      </div>

      <div style={{ marginTop: 18 }}>
        <InteractiveList
          items={benefits.map((benefit, index) => ({
            key: benefit.title,
            title: benefit.title,
            detail: benefit.detail,
            onClick: () => setSelectedIndex(index),
            leftIcon: (
              <div
                style={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                  background: '#eef4ff',
                  color: '#173f82',
                  flexShrink: 0,
                }}
              >
                <benefit.icon size={22} strokeWidth={1.8} />
              </div>
            ),
          }))}
        />
      </div>
    </>
  );
};

export default BenefitsScreen;
