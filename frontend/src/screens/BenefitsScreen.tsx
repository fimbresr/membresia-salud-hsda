import React, { useState } from 'react';
import {
  Percent,
  CircleDollarSign,
  Ticket,
  Heart,
  ShieldCheck,
  Star,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
} from 'lucide-react';
import { useSwipeBack } from '../hooks/useSwipeBack';

const allBenefits = [
  {
    icon: Percent,
    title: 'Descuentos exclusivos',
    detail: 'Hasta 30% en servicios seleccionados',
    fullDesc: 'Disfruta de descuentos especiales en consultas, estudios de laboratorio y farmacia. Válido en todas las sucursales del Hospital San Diego.',
    highlights: ['30% off en consultas generales', '20% off en estudios de laboratorio', '15% off en farmacia'],
  },
  {
    icon: CircleDollarSign,
    title: 'Cashback',
    detail: 'Acumula el 5% de tus compras',
    fullDesc: 'Cada vez que uses tu membresía en servicios del hospital, acumulas el 5% del monto pagado como cashback canjeable en tu siguiente visita.',
    highlights: ['5% de retorno en cada servicio', 'Sin límite de acumulación', 'Canjeable al instante'],
  },
  {
    icon: Ticket,
    title: 'Promociones especiales',
    detail: 'Ofertas solo para miembros',
    fullDesc: 'Acceso anticipado a promociones exclusivas, campañas de salud preventiva y paquetes especiales diseñados solo para miembros activos.',
    highlights: ['Acceso anticipado a promos', 'Paquetes de salud preventiva', 'Ofertas de temporada'],
  },
  {
    icon: Heart,
    title: 'Atención prioritaria',
    detail: 'Sin filas en mostrador',
    fullDesc: 'Al presentar tu código QR de membresía, recibirás atención preferencial en mostrador y módulos de atención sin necesidad de hacer fila.',
    highlights: ['Pase prioritario en mostrador', 'Módulo exclusivo para miembros', 'Tiempo de espera < 5 min'],
  },
  {
    icon: ShieldCheck,
    title: 'Cobertura ampliada',
    detail: 'Acceso a especialistas',
    fullDesc: 'Tu membresía incluye cobertura mejorada en consultas con especialistas, reduciendo significativamente los copagos en cardiología, pediatría y más.',
    highlights: ['Acceso a 12+ especialidades', 'Copagos reducidos hasta 50%', 'Sin necesidad de referencia'],
  },
  {
    icon: Star,
    title: 'Puntos rewards',
    detail: 'Canjea puntos por servicios',
    fullDesc: 'Cada peso gastado en servicios del hospital genera puntos rewards que puedes canjear por servicios gratuitos o descuentos adicionales.',
    highlights: ['1 punto por cada $10 gastados', 'Canje por servicios gratis', 'Puntos sin caducidad'],
  },
];

const BenefitsScreen: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const swipeHandlers = useSwipeBack({ onSwipeBack: () => setSelectedIndex(null) });

  if (selectedIndex !== null) {
    const benefit = allBenefits[selectedIndex];
    return (
      <div {...swipeHandlers}>
        <button
          onClick={() => setSelectedIndex(null)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, border: 0, background: 'transparent', padding: 0, cursor: 'pointer', color: '#14346e' }}
        >
          <ChevronLeft size={22} />
          <span style={{ fontFamily: '"Avenir Medium", sans-serif', fontSize: 16 }}>Mis Beneficios</span>
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
          Lucy Hernández
        </p>
        <h1 style={{ margin: '4px 0 0', fontSize: 18, lineHeight: 1.1, color: '#25385f', fontFamily: '"Avenir Light", sans-serif', fontWeight: 300 }}>
          Mis Beneficios
        </h1>
      </div>

      <div style={{ marginTop: 18, borderRadius: 24, background: 'linear-gradient(135deg, #004a8f 0%, #00a3e0 100%)', padding: '20px', color: '#ffffff' }}>
        <p style={{ margin: 0, fontSize: 13, opacity: 0.85, fontFamily: '"Avenir Medium", sans-serif' }}>Plan Premium</p>
        <p style={{ margin: '8px 0 0', fontFamily: '"Avenir Black", sans-serif', fontSize: 28, lineHeight: 1 }}>12</p>
        <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.85 }}>beneficios activos</p>
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ overflow: 'hidden', borderRadius: 24, border: '1px solid #e9edf5', background: '#ffffff', boxShadow: '0 6px 18px rgba(16, 50, 107, 0.05)' }}>
          {allBenefits.map(({ icon: Icon, title, detail }, index) => (
            <button
              key={title}
              onClick={() => setSelectedIndex(index)}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', width: '100%', border: 0, borderBottom: index < allBenefits.length - 1 ? '1px solid #edf1f7' : 'none', background: '#ffffff', borderRadius: 0, cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: '#eef4ff', color: '#173f82', flexShrink: 0 }}>
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontFamily: '"Avenir Medium", sans-serif', fontSize: 15, color: '#1d3158' }}>{title}</p>
                <p style={{ margin: '4px 0 0', fontSize: 13, lineHeight: 1.35, color: '#566e96' }}>{detail}</p>
              </div>
              <ChevronRight size={18} color="#a8b5cb" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default BenefitsScreen;
