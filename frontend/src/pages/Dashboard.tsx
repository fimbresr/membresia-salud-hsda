import React, { useState } from 'react';
import {
  Heart,
  Home,
  ShoppingBag,
  UserRound,
} from 'lucide-react';
import HomeScreen from '../screens/HomeScreen';
import BenefitsScreen from '../screens/BenefitsScreen';
import PurchasesScreen from '../screens/PurchasesScreen';
import ProfileScreen from '../screens/ProfileScreen';

type TabKey = 'home' | 'benefits' | 'purchases' | 'profile';

const navItems: Array<{
  key: TabKey;
  label: string;
  icon: typeof Home;
}> = [
  { key: 'home', label: 'Inicio', icon: Home },
  { key: 'benefits', label: 'Beneficios', icon: Heart },
  { key: 'purchases', label: 'Compras', icon: ShoppingBag },
  { key: 'profile', label: 'Perfil', icon: UserRound },
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'benefits':
        return <BenefitsScreen />;
      case 'purchases':
        return <PurchasesScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'home':
      default:
        return <HomeScreen onNavigate={(tab) => setActiveTab(tab as TabKey)} />;
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '28px 16px',
        background: '#f6f7fb',
      }}
    >
      <div style={{ maxWidth: 430, margin: '0 auto' }}>
        <section
          style={{
            borderRadius: 38,
            background: '#ffffff',
            padding: '22px 18px 16px',
            boxShadow: '0 18px 45px rgba(21, 46, 89, 0.08)',
          }}
        >
          {renderScreen()}

          <nav
            style={{
              marginTop: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 6px 0',
            }}
          >
            {navItems.map(({ key, label, icon: Icon }) => {
              const isActive = activeTab === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    border: 0,
                    background: 'transparent',
                    padding: '8px 0',
                    color: isActive ? '#173f82' : '#24375a',
                    cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.4 : 2} />
                  <span
                    style={{
                      fontSize: 11,
                      color: isActive ? '#173f82' : '#24375a',
                    }}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </nav>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
