import React, { useState } from 'react';
import {
  UserRound,
  ChevronRight,
  ChevronLeft,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  CheckCircle,
  Lock,
  Globe,
  MessageCircle,
} from 'lucide-react';

interface ProfileSection {
  icon: typeof Bell;
  title: string;
  detail: string;
  fullDesc: string;
  items: Array<{ icon: typeof CheckCircle; label: string; value: string }>;
}

const profileSections: ProfileSection[] = [
  {
    icon: Bell,
    title: 'Notificaciones',
    detail: 'Gestiona tus alertas',
    fullDesc: 'Configura qué notificaciones deseas recibir y cómo recibirlas.',
    items: [
      { icon: CheckCircle, label: 'Recordatorios de citas', value: 'Activado' },
      { icon: CheckCircle, label: 'Estado de pagos', value: 'Activado' },
      { icon: Bell, label: 'Promociones', value: 'Desactivado' },
    ],
  },
  {
    icon: Shield,
    title: 'Seguridad',
    detail: 'Biometría y contraseña',
    fullDesc: 'Administra los métodos de autenticación y seguridad de tu cuenta.',
    items: [
      { icon: Lock, label: 'Face ID / Huella dactilar', value: 'Configurado' },
      { icon: Lock, label: 'Contraseña', value: 'Última actualización: hace 30 días' },
      { icon: Shield, label: 'Autenticación de dos factores', value: 'Desactivado' },
    ],
  },
  {
    icon: CreditCard,
    title: 'Métodos de pago',
    detail: 'Tarjetas guardadas',
    fullDesc: 'Gestiona tus tarjetas y métodos de pago registrados.',
    items: [
      { icon: CreditCard, label: 'Visa terminada en 4521', value: 'Principal' },
      { icon: CreditCard, label: 'Mastercard terminada en 8903', value: 'Secundaria' },
    ],
  },
  {
    icon: HelpCircle,
    title: 'Ayuda',
    detail: 'Centro de soporte',
    fullDesc: 'Obtén ayuda sobre el uso de la app o contacta al soporte del hospital.',
    items: [
      { icon: MessageCircle, label: 'Chat en vivo', value: 'Disponible 24/7' },
      { icon: Globe, label: 'Sitio web del hospital', value: 'hospital.mx' },
      { icon: HelpCircle, label: 'Preguntas frecuentes', value: '12 temas' },
    ],
  },
];

const ProfileScreen: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (selectedIndex !== null) {
    const section = profileSections[selectedIndex];
    return (
      <>
        <button
          onClick={() => setSelectedIndex(null)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, border: 0, background: 'transparent', padding: 0, cursor: 'pointer', color: '#14346e' }}
        >
          <ChevronLeft size={22} />
          <span style={{ fontFamily: '"Avenir Medium", sans-serif', fontSize: 16 }}>Mi Perfil</span>
        </button>

        <div style={{ marginTop: 20, borderRadius: 28, background: 'linear-gradient(135deg, #004a8f 0%, #00a3e0 100%)', padding: '28px 22px', color: '#ffffff', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <section.icon size={32} strokeWidth={1.8} />
          </div>
          <h2 style={{ margin: '14px 0 4px', fontFamily: '"Avenir Black", sans-serif', fontSize: 22 }}>{section.title}</h2>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.85 }}>{section.detail}</p>
        </div>

        <p style={{ margin: '18px 0 0', fontSize: 14, lineHeight: 1.6, color: '#1d3158' }}>{section.fullDesc}</p>

        <div style={{ marginTop: 18, borderRadius: 24, overflow: 'hidden', border: '1px solid #e9edf5', background: '#ffffff', boxShadow: '0 6px 18px rgba(16, 50, 107, 0.05)' }}>
          {section.items.map(({ icon: ItemIcon, label, value }, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderBottom: i < section.items.length - 1 ? '1px solid #edf1f7' : 'none' }}>
              <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: '#eef4ff', color: '#173f82', flexShrink: 0 }}>
                <ItemIcon size={18} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontFamily: '"Avenir Medium", sans-serif', fontSize: 14, color: '#1d3158' }}>{label}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#566e96' }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <p style={{ margin: 0, fontFamily: '"Avenir Medium", sans-serif', fontSize: 18, color: '#14346e' }}>
          Mi Perfil
        </p>
        <p style={{ margin: '2px 0 0', fontSize: 13, color: '#566e96' }}>
          Lucy Hernández
        </p>
      </div>

      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 16, padding: 18, borderRadius: 24, background: '#ffffff', border: '1px solid #eef1f6' }}>
        <div style={{ width: 60, height: 60, borderRadius: 999, background: 'linear-gradient(135deg, #004a8f, #00a3e0)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
          <UserRound size={30} strokeWidth={2} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontFamily: '"Avenir Medium", sans-serif', fontSize: 17, color: '#1d3158' }}>Lucy Hernández</p>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#566e96' }}>lucy.hdz@correo.com</p>
          <p style={{ margin: '2px 0 0', fontSize: 13, color: '#566e96' }}>ID: MEM-2026-8842</p>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ overflow: 'hidden', borderRadius: 24, border: '1px solid #e9edf5', background: '#ffffff', boxShadow: '0 6px 18px rgba(16, 50, 107, 0.05)' }}>
          {profileSections.map(({ icon: Icon, title, detail }, index) => (
            <button
              key={title}
              onClick={() => setSelectedIndex(index)}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderBottom: index < profileSections.length - 1 ? '1px solid #edf1f7' : 'none', width: '100%', border: 0, background: '#ffffff', borderRadius: 0, cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: '#eef4ff', color: '#173f82', flexShrink: 0 }}>
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontFamily: '"Avenir Medium", sans-serif', fontSize: 15, color: '#1d3158' }}>{title}</p>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: '#566e96' }}>{detail}</p>
              </div>
              <ChevronRight size={18} color="#a8b5cb" />
            </button>
          ))}
        </div>
      </div>

      <button
        style={{ marginTop: 24, width: '100%', padding: '14px', borderRadius: 16, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', fontSize: 15, fontFamily: '"Avenir Medium", sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
      >
        <LogOut size={18} />
        Cerrar sesión
      </button>
    </>
  );
};

export default ProfileScreen;
