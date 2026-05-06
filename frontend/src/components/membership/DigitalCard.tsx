import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, ShieldCheck, User } from 'lucide-react';

interface DigitalCardProps {
  userName: string;
  memberId: string;
  plan: 'Básico' | 'Plus' | 'Premium';
  expiryDate: string;
  status: 'Activa' | 'Vencida' | 'Suspendida';
}

export const DigitalCard: React.FC<DigitalCardProps> = ({
  userName,
  memberId,
  plan,
  expiryDate,
  status
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-md h-64 mx-auto rounded-3xl overflow-hidden shadow-2xl bg-hospital-primary text-white p-6 flex flex-col justify-between"
      style={{
        background: 'linear-gradient(135deg, #004a8f 0%, #00a3e0 100%)',
      }}
    >
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-lg">
            <img src="/logo.png" alt="HSDA Logo" className="w-8 h-8 object-contain" />
          </div>
          <span className="font-avenirMedium text-sm opacity-90">Hospital San Diego de Alcalá</span>
        </div>
        <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-avenirMedium backdrop-blur-md">
          <ShieldCheck size={12} />
          {status}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs opacity-70 font-avenirLight uppercase tracking-wider">Titular de la Membresía</p>
            <h2 className="text-2xl font-avenirBlack">{userName}</h2>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-70 font-avenirLight uppercase tracking-wider">Plan</p>
            <p className="text-lg font-avenirMedium">{plan}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs opacity-70 font-avenirLight uppercase tracking-wider">ID Miembro</p>
            <p className="font-avenirMedium text-sm">{memberId}</p>
          </div>
          <div>
            <p className="text-xs opacity-70 font-avenirLight uppercase tracking-wider">Vence</p>
            <p className="font-avenirMedium text-sm">{expiryDate}</p>
          </div>
        </div>
      </div>

      {/* Footer QR Section */}
      <div className="relative z-10 flex justify-center mt-4">
        <div className="bg-white p-2 rounded-xl shadow-inner">
          <QrCode size={64} className="text-hospital-primary" />
        </div>
      </div>
    </motion.div>
  );
};
