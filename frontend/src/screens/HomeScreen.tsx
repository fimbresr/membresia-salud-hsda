import React, { useState } from 'react';
import { DigitalCard } from '../components/membership/DigitalCard';
import { DetailView } from '../components/shared/DetailView';
import { InteractiveList } from '../components/shared/InteractiveList';
import { homeBenefits } from '../data/mockData';
import { useSwipeBack } from '../hooks/useSwipeBack';
import type { MembershipExperienceData } from '../types/app';

interface HomeScreenProps {
  membershipExperience: MembershipExperienceData;
  onNavigate?: (tab: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  membershipExperience,
  onNavigate,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const swipeHandlers = useSwipeBack({ onSwipeBack: () => setSelectedIndex(null) });
  const { card, profile, membershipMode, membershipView, registeredDependents } =
    membershipExperience;

  if (selectedIndex !== null) {
    const benefit = homeBenefits[selectedIndex];
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
          Hola, {profile.greetingName}
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
          Mi membresía
        </h1>
      </div>

      <div style={{ marginTop: 18 }}>
        <DigitalCard
          userName={card.userName}
          memberId={card.memberId}
          plan={card.plan}
          status={card.status}
        />
      </div>

      {(membershipMode === 'Familiar' || registeredDependents.length > 0) && (
        <section
          style={{
            marginTop: 14,
            borderRadius: 24,
            border: '1px solid #e4ecf8',
            background: '#ffffff',
            padding: '16px 18px',
            boxShadow: '0 4px 14px rgba(16, 50, 107, 0.04)',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#657ba2',
              fontFamily: '"Avenir Medium", sans-serif',
            }}
          >
            Vista de membresía
          </p>
          <p
            style={{
              margin: '8px 0 0',
              fontSize: 16,
              color: '#173660',
              fontFamily: '"Avenir Medium", sans-serif',
            }}
          >
            {membershipMode} · {membershipView}
          </p>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: '#60749c' }}>
            {registeredDependents.length > 0
              ? `${registeredDependents.length} integrante(s) asociado(s) a esta cuenta.`
              : 'Sin integrantes adicionales registrados.'}
          </p>
        </section>
      )}

      <section
        style={{
          marginTop: 18,
          borderRadius: 24,
          border: '1px solid #eef1f6',
          background: '#ffffff',
          padding: '16px 18px',
          boxShadow: '0 4px 14px rgba(16, 50, 107, 0.05)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: 14, color: '#24375a' }}>
              Saldo Cashback
            </p>
            <p
              style={{
                margin: '6px 0 0',
                fontFamily: '"Avenir Black", sans-serif',
                fontSize: 28,
                lineHeight: 1,
                color: '#163f83',
              }}
            >
              {profile.cashbackBalance}
            </p>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#4a628f' }}>
              {profile.cashbackLabel}
            </p>
          </div>
          <div
            style={{
              width: 56,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 999,
              border: '2px solid #2b5eae',
              color: '#1f57a8',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: '"Avenir Black", sans-serif',
                fontSize: 28,
                lineHeight: 1,
              }}
            >
              $
            </span>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 18 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18, color: '#1b315a' }}>
            Tus beneficios
          </h2>
          {onNavigate && (
            <button
              onClick={() => onNavigate('benefits')}
              style={{
                border: 0,
                background: 'transparent',
                color: '#173f82',
                fontSize: 13,
                fontFamily: '"Avenir Medium", sans-serif',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Ver todos →
            </button>
          )}
        </div>

        <InteractiveList
          items={homeBenefits.map((benefit, index) => ({
            key: benefit.title,
            title: benefit.title,
            detail: benefit.detail,
            onClick: () => setSelectedIndex(index),
            leftIcon: (
              <div
                style={{
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#173f82',
                  flexShrink: 0,
                }}
              >
                <benefit.icon size={30} strokeWidth={1.8} />
              </div>
            ),
          }))}
        />
      </section>
    </>
  );
};

export default HomeScreen;
