import React from 'react';
import { DigitalCard } from './components/membership/DigitalCard';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-hospital-background p-6 flex flex-col items-center justify-center gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-avenirBlack text-hospital-dark">Mi Membresía</h1>
        <p className="text-hospital-dark/60 font-avenirLight">Gestión de Salud Hospital San Diego</p>
      </div>

      {/* La Tarjeta Digital como elemento central */}
      <DigitalCard 
        userName="Juan Pérez"
        memberId="MEM-2026-8842"
        plan="Premium"
        expiryDate="31 DIC 2026"
        status="Activa"
      />

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <button className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 hover:bg-slate-50 transition-colors">
          <span className="text-hospital-primary font-avenirMedium">Citas</span>
        </button>
        <button className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 hover:bg-slate-50 transition-colors">
          <span className="text-hospital-primary font-avenirMedium">Expediente</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
