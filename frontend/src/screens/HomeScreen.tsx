import React, { useState } from 'react';
import {
  CircleDollarSign,
  ChevronRight,
  Percent,
  Ticket,
  CheckCircle,
} from 'lucide-react';
import { DigitalCard } from '../components/membership/DigitalCard';
import { useSwipeBack } from '../hooks/useSwipeBack';

const benefitItems = [
  {
    icon: Percent,
    title: 'Descuentos exclusivos',
    detail: 'en servicios seleccionados',
    fullDesc: 'Hasta 30% de descuento en consultas, estudios de laboratorio y farmacia.',
    highlights: ['30% off en consultas', '20% off en estudios', '15% off en farmacia'],
  },
  {
    icon: CircleDollarSign,
    title: 'Cashback en tus compras',
    detail: 'acumula y ahorra',
    fullDesc: 'Acumula el 5% de cada servicio pagado como cashback canjeable.',
    highlights: ['5% de retorno', 'Sin límite', 'Canje inmediato'],
  },
  {
    icon: Ticket,
    title: 'Promociones especiales',
    detail: 'solo para miembros',
    fullDesc: 'Acceso a promociones exclusivas y campañas de salud preventiva.',
    highlights: ['Acceso anticipado', 'Paquetes preventivos', 'Ofertas de temporada'],
  },
];

interface HomeScreenProps {
  onNavigate?: (tab: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const swipeHandlers = useSwipeBack({ onSwipeBack: () => setSelectedIndex(null) });

  if (selectedIndex !== null) {
    const benefit = benefitItems[selectedIndex];
    return (
      <div {...swipeHandlers}>
        <button
          onClick={() => setSelectedIndex(null)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, border: 0, background: 'transparent', padding: 0, cursor: 'pointer', color: '#14346e' }}
        >
          <span style={{ fontFamily: '"Avenir Medium", sans-serif', fontSize: 16 }}>← Mis Beneficios</span>
        </button>

        <div style={{ marginTop: 20, borderRadius: 28, background: 'linear-gradient(135deg, #004a8f 0%, #00a3e0 100%)', padding: '28px 22px', color: '#ffffff', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <benefit.icon size={32} strokeWidth={1.8} />
          </div>
          <h2 style={{ margin: '14px 0 4px', fontFamily: '"Avenir Black", sans-serif', fontSize: 22 }}>{benefit.title}</h2>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.85 }}>{benefit.detail}</p>
        </div>

        <p style={{ margin: '18px 0 0', fontSize: 14, lineHeight: 1.6, color: '#1d3158' }}>{benefit.fullDesc}</p>

        <div style={{ marginTop: 18 }}>
          <p style={{ margin: '0 0 10px', fontFamily: '"Avenir Medium", sans-serif', fontSize: 15, color: '#1d3158' }}>Lo que incluye:</p>
          {benefit.highlights.map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < benefit.highlights.length - 1 ? '1px solid #edf1f7' : 'none' }}>
              <CheckCircle size={18} color="#16a34a" />
              <span style={{ fontSize: 14, color: '#24375a' }}>{h}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <p style={{ margin: 0, fontFamily: '"Avenir Medium", sans-serif', fontSize: 18, color: '#14346e' }}>
          Hola, Lucy
        </p>
        <h1 style={{ margin: '4px 0 0', fontSize: 18, lineHeight: 1.1, color: '#25385f', fontFamily: '"Avenir Light", sans-serif', fontWeight: 300 }}>
          Mi membresía
        </h1>
      </div>

      <div style={{ marginTop: 18 }}>
        <DigitalCard userName="Lucy Hernández" memberId="ID 1000 2345 6789" plan="Premium" status="Activa" />
      </div>

      <section style={{ marginTop: 18, borderRadius: 24, border: '1px solid #eef1f6', background: '#ffffff', padding: '16px 18px', boxShadow: '0 4px 14px rgba(16, 50, 107, 0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <p style={{ margin: 0, fontSize: 14, color: '#24375a' }}>Saldo Cashback</p>
            <p style={{ margin: '6px 0 0', fontFamily: '"Avenir Black", sans-serif', fontSize: 28, lineHeight: 1, color: '#163f83' }}>
              $850.00
            </p>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#4a628f' }}>pesos disponibles</p>
          </div>
          <div style={{ width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, border: '2px solid #2b5eae', color: '#1f57a8', flexShrink: 0 }}>
            <span style={{ fontFamily: '"Avenir Black", sans-serif', fontSize: 28, lineHeight: 1 }}>$</span>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontSize: 18, color: '#1b315a' }}>Tus beneficios</h2>
          {onNavigate && (
            <button
              onClick={() => onNavigate('benefits')}
              style={{ border: 0, background: 'transparent', color: '#173f82', fontSize: 13, fontFamily: '"Avenir Medium", sans-serif', cursor: 'pointer', padding: 0 }}
            >
              Ver todos →
            </button>
          )}
        </div>
        <div style={{ overflow: 'hidden', borderRadius: 24, border: '1px solid #e9edf5', background: '#ffffff', boxShadow: '0 6px 18px rgba(16, 50, 107, 0.05)' }}>
          {benefitItems.map(({ icon: Icon, title, detail }, index) => (
            <button
              key={title}
              onClick={() => setSelectedIndex(index)}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderBottom: index < benefitItems.length - 1 ? '1px solid #edf1f7' : 'none', width: '100%', border: 0, background: '#ffffff', borderRadius: 0, cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#173f82', flexShrink: 0 }}>
                <Icon size={30} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontFamily: '"Avenir Medium", sans-serif', fontSize: 15, color: '#1d3158' }}>{title}</p>
                <p style={{ margin: '4px 0 0', fontSize: 13, lineHeight: 1.35, color: '#566e96' }}>{detail}</p>
              </div>
              <ChevronRight size={18} color="#a8b5cb" />
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeScreen;
