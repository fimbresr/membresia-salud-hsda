import React, { useState } from 'react';
import { LogOut, UserRound } from 'lucide-react';
import { DetailView } from '../components/shared/DetailView';
import { InteractiveList } from '../components/shared/InteractiveList';
import { profileSections } from '../data/mockData';
import { useSwipeBack } from '../hooks/useSwipeBack';
import type { MembershipExperienceData } from '../types/app';

interface ProfileScreenProps {
  membershipExperience: MembershipExperienceData;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ membershipExperience }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const swipeHandlers = useSwipeBack({ onSwipeBack: () => setSelectedIndex(null) });
  const { profile, registeredDependents } = membershipExperience;

  if (selectedIndex !== null) {
    const section = profileSections[selectedIndex];
    return (
      <div {...swipeHandlers}>
        <DetailView
          title={section.title}
          subtitle={section.detail}
          description={section.fullDesc}
          icon={section.icon}
          backLabel="Mi Perfil"
          onBack={() => setSelectedIndex(null)}
        >
          <div style={{ marginTop: 18 }}>
            <InteractiveList
              items={section.items.map((item) => ({
                key: item.label,
                title: item.label,
                detail: item.value,
                leftIcon: (
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 12,
                      background: '#eef4ff',
                      color: '#173f82',
                      flexShrink: 0,
                    }}
                  >
                    <item.icon size={18} strokeWidth={1.8} />
                  </div>
                ),
              }))}
            />
          </div>
        </DetailView>
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
          Mi Perfil
        </p>
        <p style={{ margin: '2px 0 0', fontSize: 13, color: '#566e96' }}>
          {profile.fullName}
        </p>
      </div>

      <div
        style={{
          marginTop: 18,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: 18,
          borderRadius: 24,
          background: '#ffffff',
          border: '1px solid #eef1f6',
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 999,
            background: 'linear-gradient(135deg, #004a8f, #00a3e0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            flexShrink: 0,
          }}
        >
          <UserRound size={30} strokeWidth={2} />
        </div>
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontFamily: '"Avenir Medium", sans-serif',
              fontSize: 17,
              color: '#1d3158',
            }}
          >
            {profile.fullName}
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#566e96' }}>
            {profile.email}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 13, color: '#566e96' }}>
            ID: {profile.memberCode}
          </p>
        </div>
      </div>

      {registeredDependents.length > 0 && (
        <div
          style={{
            marginTop: 14,
            borderRadius: 22,
            border: '1px solid #e4ecf8',
            background: '#ffffff',
            padding: '14px 16px',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: '#173660',
              fontFamily: '"Avenir Medium", sans-serif',
            }}
          >
            Integrantes registrados
          </p>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: '#60749c' }}>
            {registeredDependents.map((dependent) => dependent.fullName).join(', ')}
          </p>
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <InteractiveList
          items={profileSections.map((section, index) => ({
            key: section.title,
            title: section.title,
            detail: section.detail,
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
                <section.icon size={22} strokeWidth={1.8} />
              </div>
            ),
          }))}
        />
      </div>

      <button
        style={{
          marginTop: 24,
          width: '100%',
          padding: '14px',
          borderRadius: 16,
          border: '1px solid #fecaca',
          background: '#fef2f2',
          color: '#dc2626',
          fontSize: 15,
          fontFamily: '"Avenir Medium", sans-serif',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <LogOut size={18} />
        Cerrar sesión
      </button>
    </>
  );
};

export default ProfileScreen;
