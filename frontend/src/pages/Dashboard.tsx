import React from 'react';
import {
  CircleDollarSign,
  ChevronRight,
  Heart,
  Home,
  Percent,
  ShoppingBag,
  Ticket,
  UserRound,
} from 'lucide-react';
import { DigitalCard } from '../components/membership/DigitalCard';

const benefitItems = [
  {
    icon: Percent,
    title: 'Descuentos exclusivos',
    detail: 'en servicios seleccionados',
  },
  {
    icon: CircleDollarSign,
    title: 'Cashback en tus compras',
    detail: 'acumula y ahorra',
  },
  {
    icon: Ticket,
    title: 'Promociones especiales',
    detail: 'solo para miembros',
  },
];

const navItems = [
  { icon: Home, label: 'Inicio', active: true },
  { icon: Heart, label: 'Beneficios', active: false },
  { icon: ShoppingBag, label: 'Compras', active: false },
  { icon: UserRound, label: 'Perfil', active: false },
];

const Dashboard: React.FC = () => {
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
          <div>
            <p
              style={{
                margin: 0,
                fontFamily: '"Avenir Medium", sans-serif',
                fontSize: 18,
                color: '#14346e',
              }}
            >
              Hola, Lucy
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
              userName="Lucy Hernández"
              memberId="ID 1000 2345 6789"
              status="Activa"
            />
          </div>

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
                <p style={{ margin: 0, fontSize: 14, color: '#24375a' }}>Saldo Cashback</p>
                <p
                  style={{
                    margin: '6px 0 0',
                    fontFamily: '"Avenir Black", sans-serif',
                    fontSize: 28,
                    lineHeight: 1,
                    color: '#163f83',
                  }}
                >
                  $850.00
                </p>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: '#4a628f' }}>
                  pesos disponibles
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
            <h2 style={{ margin: '0 0 12px', fontSize: 18, color: '#1b315a' }}>
              Tus beneficios
            </h2>

            <div
              style={{
                overflow: 'hidden',
                borderRadius: 24,
                border: '1px solid #e9edf5',
                background: '#ffffff',
                boxShadow: '0 6px 18px rgba(16, 50, 107, 0.05)',
              }}
            >
              {benefitItems.map(({ icon: Icon, title, detail }, index) => (
                <article
                  key={title}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '16px 18px',
                    borderBottom: index < benefitItems.length - 1 ? '1px solid #edf1f7' : 'none',
                  }}
                >
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
                    <Icon size={30} strokeWidth={1.8} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: '"Avenir Medium", sans-serif',
                        fontSize: 15,
                        color: '#1d3158',
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        margin: '4px 0 0',
                        fontSize: 13,
                        lineHeight: 1.35,
                        color: '#566e96',
                      }}
                    >
                      {detail}
                    </p>
                  </div>

                  <ChevronRight size={18} color="#a8b5cb" />
                </article>
              ))}
            </div>
          </section>

          <nav
            style={{
              marginTop: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 6px 0',
            }}
          >
            {navItems.map(({ icon: Icon, label, active }) => (
              <button
                key={label}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  border: 0,
                  background: 'transparent',
                  padding: '8px 0',
                  color: active ? '#173f82' : '#24375a',
                  cursor: 'pointer',
                }}
              >
                <Icon size={24} strokeWidth={active ? 2.4 : 2} />
                <span
                  style={{
                    fontSize: 11,
                    color: active ? '#173f82' : '#24375a',
                  }}
                >
                  {label}
                </span>
              </button>
            ))}
          </nav>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
