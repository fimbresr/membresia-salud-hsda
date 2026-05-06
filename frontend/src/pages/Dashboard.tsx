import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.15 } },
};

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'benefits':
        return <BenefitsScreen />;
      case 'purchases':
        return <PurchasesScreen />;
      case 'profile':
        return <ProfileScreen onNavigate={(tab) => setActiveTab(tab as TabKey)} />;
      case 'home':
      default:
        return <HomeScreen onNavigate={(tab) => setActiveTab(tab as TabKey)} />;
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        minHeight: '100dvh',
        padding: '16px 16px 0',
        paddingTop: 'max(16px, env(safe-area-inset-top))',
        background: '#f6f7fb',
      }}
    >
      <div style={{ maxWidth: 430, margin: '0 auto' }}>
        <section
          style={{
            borderRadius: 38,
            background: '#ffffff',
            padding: '22px 18px 16px',
            paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
            boxShadow: '0 18px 45px rgba(21, 46, 89, 0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>

          <nav
            style={{
              marginTop: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 6px 0',
              borderTop: '1px solid #edf1f7',
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
                    color: isActive ? '#173f82' : '#8b9ab8',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.4 : 2} />
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: isActive ? '"Avenir Medium", sans-serif' : '"Avenir Light", sans-serif',
                      color: isActive ? '#173f82' : '#8b9ab8',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: 999,
                        background: '#173f82',
                      }}
                    />
                  )}
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
