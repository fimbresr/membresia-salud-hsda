import React from 'react';
import {
  ShoppingBag,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const purchases = [
  { icon: ShoppingBag, title: 'Membresía Premium', date: '01 May 2026', amount: '$2,500.00', status: 'Completado', statusIcon: CheckCircle, statusColor: '#16a34a' },
  { icon: ShoppingBag, title: 'Consulta Cardiología', date: '20 Abr 2026', amount: '$350.00', status: 'Completado', statusIcon: CheckCircle, statusColor: '#16a34a' },
  { icon: ShoppingBag, title: 'Membresía Plus', date: '01 Abr 2026', amount: '$1,800.00', status: 'Completado', statusIcon: CheckCircle, statusColor: '#16a34a' },
  { icon: ShoppingBag, title: 'Estudios Laboratorio', date: '15 Mar 2026', amount: '$120.00', status: 'Reembolsado', statusIcon: XCircle, statusColor: '#dc2626' },
  { icon: ShoppingBag, title: 'Membresía Básica', date: '01 Mar 2026', amount: '$2,500.00', status: 'Pendiente', statusIcon: Clock, statusColor: '#f59e0b' },
];

const PurchasesScreen: React.FC = () => {
  return (
    <>
      <div>
        <p style={{ margin: 0, fontFamily: '"Avenir Medium", sans-serif', fontSize: 18, color: '#14346e' }}>
          Mis Compras
        </p>
        <h1 style={{ margin: '4px 0 0', fontSize: 18, lineHeight: 1.1, color: '#25385f', fontFamily: '"Avenir Light", sans-serif', fontWeight: 300 }}>
          Historial de transacciones
        </h1>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
        {['Todos', 'Completados', 'Pendientes'].map((f) => (
          <button key={f} style={{ flex: 1, padding: '10px 0', borderRadius: 12, border: '1px solid #dce3ef', background: f === 'Todos' ? '#173f82' : '#ffffff', color: f === 'Todos' ? '#ffffff' : '#24375a', fontSize: 13, fontFamily: '"Avenir Medium", sans-serif', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ overflow: 'hidden', borderRadius: 24, border: '1px solid #e9edf5', background: '#ffffff', boxShadow: '0 6px 18px rgba(16, 50, 107, 0.05)' }}>
          {purchases.map(({ icon: Icon, title, date, amount, status, statusIcon: StatusIcon, statusColor }, index) => (
            <article key={title} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderBottom: index < purchases.length - 1 ? '1px solid #edf1f7' : 'none' }}>
              <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: '#eef4ff', color: '#173f82', flexShrink: 0 }}>
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontFamily: '"Avenir Medium", sans-serif', fontSize: 15, color: '#1d3158' }}>{title}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <p style={{ margin: 0, fontSize: 12, color: '#566e96' }}>{date}</p>
                  <span style={{ width: 3, height: 3, borderRadius: 999, background: '#a8b5cb' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <StatusIcon size={12} color={statusColor} />
                    <p style={{ margin: 0, fontSize: 12, color: statusColor }}>{status}</p>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontFamily: '"Avenir Medium", sans-serif', fontSize: 15, color: '#1d3158' }}>{amount}</p>
              </div>
              <ChevronRight size={16} color="#a8b5cb" />
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default PurchasesScreen;
