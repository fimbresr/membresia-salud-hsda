import React, { useState } from 'react';
import {
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  FileText,
} from 'lucide-react';
import { useSwipeBack } from '../hooks/useSwipeBack';

type PurchaseStatus = 'Completado' | 'Pendiente' | 'Reembolsado';

interface Purchase {
  icon: typeof ShoppingBag;
  title: string;
  date: string;
  amount: string;
  status: PurchaseStatus;
  statusIcon: typeof CheckCircle;
  statusColor: string;
  fullDesc: string;
  receiptId: string;
}

const purchases: Purchase[] = [
  { icon: ShoppingBag, title: 'Membresía Premium', date: '01 May 2026', amount: '$2,500.00', status: 'Completado', statusIcon: CheckCircle, statusColor: '#16a34a', fullDesc: 'Pago de membresía anual Plan Premium. Cobertura completa en todas las especialidades del Hospital San Diego de Alcalá.', receiptId: 'REC-2026-001' },
  { icon: ShoppingBag, title: 'Consulta Cardiología', date: '20 Abr 2026', amount: '$350.00', status: 'Completado', statusIcon: CheckCircle, statusColor: '#16a34a', fullDesc: 'Consulta con Dr. López en la especialidad de Cardiología. Incluye electrocardiograma básico.', receiptId: 'REC-2026-002' },
  { icon: ShoppingBag, title: 'Membresía Plus', date: '01 Abr 2026', amount: '$1,800.00', status: 'Completado', statusIcon: CheckCircle, statusColor: '#16a34a', fullDesc: 'Pago de membresía mensual Plan Plus. Renovación automática.', receiptId: 'REC-2026-003' },
  { icon: ShoppingBag, title: 'Estudios Laboratorio', date: '15 Mar 2026', amount: '$120.00', status: 'Reembolsado', statusIcon: XCircle, statusColor: '#dc2626', fullDesc: 'Análisis de sangre completo y perfil lipídico. Reembolso procesado por cobertura del 100%.', receiptId: 'REC-2026-004' },
  { icon: ShoppingBag, title: 'Membresía Básica', date: '01 Mar 2026', amount: '$2,500.00', status: 'Pendiente', statusIcon: Clock, statusColor: '#f59e0b', fullDesc: 'Pago de membresía anual Plan Básico. Pago en proceso de verificación.', receiptId: 'REC-2026-005' },
];

const filters = ['Todos', 'Completados', 'Pendientes'] as const;

const PurchasesScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<typeof filters[number]>('Todos');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const swipeHandlers = useSwipeBack({ onSwipeBack: () => setSelectedIndex(null) });

  const filteredPurchases = activeFilter === 'Todos'
    ? purchases
    : activeFilter === 'Completados'
      ? purchases.filter((p) => p.status === 'Completado')
      : purchases.filter((p) => p.status === 'Pendiente');

  if (selectedIndex !== null) {
    const purchase = filteredPurchases[selectedIndex];
    return (
      <div {...swipeHandlers}>
        <button
          onClick={() => setSelectedIndex(null)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, border: 0, background: 'transparent', padding: 0, cursor: 'pointer', color: '#14346e' }}
        >
          <ChevronLeft size={22} />
          <span style={{ fontFamily: '"Avenir Medium", sans-serif', fontSize: 16 }}>Mis Compras</span>
        </button>

        <div style={{ marginTop: 20, borderRadius: 28, background: 'linear-gradient(135deg, #004a8f 0%, #00a3e0 100%)', padding: '28px 22px', color: '#ffffff', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <FileText size={32} strokeWidth={1.8} />
          </div>
          <h2 style={{ margin: '14px 0 4px', fontFamily: '"Avenir Black", sans-serif', fontSize: 22 }}>{purchase.amount}</h2>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.85 }}>{purchase.title}</p>
        </div>

        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 16, background: '#f8fafc', border: '1px solid #edf1f7' }}>
            <span style={{ fontSize: 13, color: '#566e96' }}>Estado</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <purchase.statusIcon size={14} color={purchase.statusColor} />
              <span style={{ fontSize: 13, fontFamily: '"Avenir Medium", sans-serif', color: purchase.statusColor }}>{purchase.status}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 16, background: '#f8fafc', border: '1px solid #edf1f7' }}>
            <span style={{ fontSize: 13, color: '#566e96' }}>Fecha</span>
            <span style={{ fontSize: 13, fontFamily: '"Avenir Medium", sans-serif', color: '#1d3158' }}>{purchase.date}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 16, background: '#f8fafc', border: '1px solid #edf1f7' }}>
            <span style={{ fontSize: 13, color: '#566e96' }}>Comprobante</span>
            <span style={{ fontSize: 13, fontFamily: '"Avenir Medium", sans-serif', color: '#1d3158' }}>{purchase.receiptId}</span>
          </div>
        </div>

        <p style={{ margin: '18px 0 0', fontSize: 14, lineHeight: 1.6, color: '#1d3158' }}>{purchase.fullDesc}</p>
      </div>
    );
  }

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
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: 12,
              border: activeFilter === f ? '1px solid #173f82' : '1px solid #dce3ef',
              background: activeFilter === f ? '#173f82' : '#ffffff',
              color: activeFilter === f ? '#ffffff' : '#24375a',
              fontSize: 13,
              fontFamily: activeFilter === f ? '"Avenir Medium", sans-serif' : '"Avenir Light", sans-serif',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ overflow: 'hidden', borderRadius: 24, border: '1px solid #e9edf5', background: '#ffffff', boxShadow: '0 6px 18px rgba(16, 50, 107, 0.05)' }}>
          {filteredPurchases.map(({ icon: Icon, title, date, amount, status, statusIcon: StatusIcon, statusColor }, index) => (
            <button
              key={title + date}
              onClick={() => setSelectedIndex(index)}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderBottom: index < filteredPurchases.length - 1 ? '1px solid #edf1f7' : 'none', width: '100%', border: 0, background: '#ffffff', borderRadius: 0, cursor: 'pointer', textAlign: 'left' }}
            >
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
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default PurchasesScreen;
