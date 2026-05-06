import React from 'react';
import {
  UserRound,
  ChevronRight,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronLeft,
} from 'lucide-react';

const profileSections = [
  { icon: Bell, title: 'Notificaciones', detail: 'Gestiona tus alertas' },
  { icon: Shield, title: 'Seguridad', detail: 'Biometría y contraseña' },
  { icon: CreditCard, title: 'Métodos de pago', detail: 'Tarjetas guardadas' },
  { icon: HelpCircle, title: 'Ayuda', detail: 'Centro de soporte' },
];

const ProfileScreen: React.FC = () => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <ChevronLeft size={24} color="#14346e" />
        <div>
          <p style={{ margin: 0, fontFamily: '"Avenir Medium", sans-serif', fontSize: 18, color: '#14346e' }}>
            Mi Perfil
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 13, color: '#566e96' }}>
            Lucy Hernández
          </p>
        </div>
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
        <ChevronRight size={18} color="#a8b5cb" />
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ overflow: 'hidden', borderRadius: 24, border: '1px solid #e9edf5', background: '#ffffff', boxShadow: '0 6px 18px rgba(16, 50, 107, 0.05)' }}>
          {profileSections.map(({ icon: Icon, title, detail }, index) => (
            <article key={title} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderBottom: index < profileSections.length - 1 ? '1px solid #edf1f7' : 'none' }}>
              <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: '#eef4ff', color: '#173f82', flexShrink: 0 }}>
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontFamily: '"Avenir Medium", sans-serif', fontSize: 15, color: '#1d3158' }}>{title}</p>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: '#566e96' }}>{detail}</p>
              </div>
              <ChevronRight size={18} color="#a8b5cb" />
            </article>
          ))}
        </div>
      </div>

      <button style={{ marginTop: 24, width: '100%', padding: '14px', borderRadius: 16, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', fontSize: 15, fontFamily: '"Avenir Medium", sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <LogOut size={18} />
        Cerrar sesión
      </button>
    </>
  );
};

export default ProfileScreen;
