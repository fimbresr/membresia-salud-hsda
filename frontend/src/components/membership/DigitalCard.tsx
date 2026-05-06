import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, ShieldCheck } from 'lucide-react';
import logo from '../../assets/logo.png';

interface DigitalCardProps {
  userName: string;
  memberId: string;
  status: 'Activa' | 'Inactiva';
}

export const DigitalCard: React.FC<DigitalCardProps> = ({
  userName,
  memberId,
  status,
}) => {
  const isActive = status === 'Activa';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: 356,
        aspectRatio: '1.618 / 1',
        margin: '0 auto',
        borderRadius: 17,
        color: '#ffffff',
        background: 'linear-gradient(145deg, #16488c 0%, #255eaa 55%, #2f71cf 100%)',
        boxShadow: '0 18px 30px rgba(26, 63, 124, 0.24), 0 4px 10px rgba(10, 33, 72, 0.10)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 28%), radial-gradient(circle at bottom left, rgba(255,255,255,0.10), transparent 30%)',
          pointerEvents: 'none',
        }}
      />

      <img
        src={logo}
        alt="Hospital San Diego de Alcalá"
        style={{
          position: 'absolute',
          top: '-13%',
          left: '2.5%',
          width: '42%',
          height: 'auto',
          display: 'block',
          objectFit: 'contain',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '12%',
          right: '6%',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '6px 10px',
          borderRadius: 7,
          background: isActive ? 'rgba(255,255,255,0.20)' : 'rgba(155, 28, 28, 0.22)',
          border: isActive ? '1px solid rgba(255,255,255,0.16)' : '1px solid rgba(255,255,255,0.14)',
          backdropFilter: 'blur(10px)',
          color: '#ffffff',
        }}
      >
        <ShieldCheck size={11} />
        <span
          style={{
            fontSize: 10,
            fontFamily: '"Avenir Medium", sans-serif',
          }}
        >
          {status}
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          left: '6%',
          top: '58%',
          right: '38%',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 11,
            color: 'rgba(255,255,255,0.86)',
            fontFamily: '"Avenir Medium", sans-serif',
          }}
        >
          Membresía Plus
        </p>
        <h2
          style={{
            margin: '8px 0 0',
            color: '#ffffff',
            fontSize: 15,
            lineHeight: 1.15,
          }}
        >
          {userName}
        </h2>
        <p
          style={{
            margin: '8px 0 0',
            fontSize: 11,
            lineHeight: 1.3,
            color: 'rgba(255,255,255,0.82)',
            fontFamily: '"Avenir Medium", sans-serif',
          }}
        >
          {memberId}
        </p>
      </div>

      <div
        style={{
          position: 'absolute',
          right: '6%',
          bottom: '9%',
          width: '28%',
          aspectRatio: '1 / 1',
          borderRadius: 11,
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.65)',
        }}
      >
        <QrCode size={74} color="#1f57a8" strokeWidth={1.8} />
      </div>
    </motion.div>
  );
};
