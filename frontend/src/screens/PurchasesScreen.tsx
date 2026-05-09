import React, { useState } from 'react';
import { purchases, purchaseDetailIcon } from '../data/mockData';
import { DetailView } from '../components/shared/DetailView';
import { InteractiveList } from '../components/shared/InteractiveList';
import { useSwipeBack } from '../hooks/useSwipeBack';

const filters = ['Todos', 'Completados', 'Pendientes'] as const;

const PurchasesScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>('Todos');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const swipeHandlers = useSwipeBack({ onSwipeBack: () => setSelectedIndex(null) });

  const filteredPurchases =
    activeFilter === 'Todos'
      ? purchases
      : activeFilter === 'Completados'
        ? purchases.filter((purchase) => purchase.status === 'Completado')
        : purchases.filter((purchase) => purchase.status === 'Pendiente');

  if (selectedIndex !== null) {
    const purchase = filteredPurchases[selectedIndex];
    return (
      <div {...swipeHandlers}>
        <DetailView
          title={purchase.amount}
          subtitle={purchase.title}
          description={purchase.fullDesc}
          icon={purchaseDetailIcon}
          backLabel="Mis Compras"
          onBack={() => setSelectedIndex(null)}
        >
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: 16,
                background: '#f8fafc',
                border: '1px solid #edf1f7',
              }}
            >
              <span style={{ fontSize: 13, color: '#566e96' }}>Estado</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <purchase.statusIcon size={14} color={purchase.statusColor} />
                <span
                  style={{
                    fontSize: 13,
                    fontFamily: '"Avenir Medium", sans-serif',
                    color: purchase.statusColor,
                  }}
                >
                  {purchase.status}
                </span>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: 16,
                background: '#f8fafc',
                border: '1px solid #edf1f7',
              }}
            >
              <span style={{ fontSize: 13, color: '#566e96' }}>Fecha</span>
              <span
                style={{
                  fontSize: 13,
                  fontFamily: '"Avenir Medium", sans-serif',
                  color: '#1d3158',
                }}
              >
                {purchase.date}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: 16,
                background: '#f8fafc',
                border: '1px solid #edf1f7',
              }}
            >
              <span style={{ fontSize: 13, color: '#566e96' }}>Comprobante</span>
              <span
                style={{
                  fontSize: 13,
                  fontFamily: '"Avenir Medium", sans-serif',
                  color: '#1d3158',
                }}
              >
                {purchase.receiptId}
              </span>
            </div>
          </div>
        </DetailView>
      </div>
    );
  }

  return (
    <>
      <div>
        <p
          style={{
            margin: 0,
            fontFamily: '"Avenir Medium", sans-serif',
            fontSize: 18,
            color: '#14346e',
          }}
        >
          Mis Compras
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
          Historial de transacciones
        </h1>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: 12,
              border:
                activeFilter === filter
                  ? '1px solid #173f82'
                  : '1px solid #dce3ef',
              background: activeFilter === filter ? '#173f82' : '#ffffff',
              color: activeFilter === filter ? '#ffffff' : '#24375a',
              fontSize: 13,
              fontFamily:
                activeFilter === filter
                  ? '"Avenir Medium", sans-serif'
                  : '"Avenir Light", sans-serif',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 18 }}>
        <InteractiveList
          items={filteredPurchases.map((purchase, index) => ({
            key: `${purchase.title}-${purchase.date}`,
            title: purchase.title,
            detail: purchase.date,
            onClick: () => setSelectedIndex(index),
            leftIcon: (
              <div
                style={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                  background: '#eef4ff',
                  color: '#173f82',
                  flexShrink: 0,
                }}
              >
                <purchase.icon size={22} strokeWidth={1.8} />
              </div>
            ),
            rightMeta: (
              <div style={{ textAlign: 'right' }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: '"Avenir Medium", sans-serif',
                    fontSize: 15,
                    color: '#1d3158',
                  }}
                >
                  {purchase.amount}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 4,
                    marginTop: 4,
                  }}
                >
                  <purchase.statusIcon size={12} color={purchase.statusColor} />
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: purchase.statusColor,
                    }}
                  >
                    {purchase.status}
                  </p>
                </div>
              </div>
            ),
          }))}
        />
      </div>
    </>
  );
};

export default PurchasesScreen;
