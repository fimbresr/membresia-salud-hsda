import type { LucideIcon } from 'lucide-react';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';

interface DetailViewProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  backLabel: string;
  onBack: () => void;
  highlights?: string[];
  children?: ReactNode;
}

const iconWrapStyle = {
  width: 64,
  height: 64,
  borderRadius: 999,
  background: 'rgba(255,255,255,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
} satisfies CSSProperties;

export function DetailView({
  title,
  subtitle,
  description,
  icon: Icon,
  backLabel,
  onBack,
  highlights,
  children,
}: DetailViewProps) {
  return (
    <div>
      <button
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          border: 0,
          background: 'transparent',
          padding: 0,
          cursor: 'pointer',
          color: '#14346e',
        }}
      >
        <ChevronLeft size={22} />
        <span style={{ fontFamily: '"Avenir Medium", sans-serif', fontSize: 16 }}>
          {backLabel}
        </span>
      </button>

      <div
        style={{
          marginTop: 20,
          borderRadius: 28,
          background: 'linear-gradient(135deg, #004a8f 0%, #00a3e0 100%)',
          padding: '28px 22px',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <div style={iconWrapStyle}>
          <Icon size={32} strokeWidth={1.8} />
        </div>
        <h2
          style={{
            margin: '14px 0 4px',
            fontFamily: '"Avenir Black", sans-serif',
            fontSize: 22,
          }}
        >
          {title}
        </h2>
        <p style={{ margin: 0, fontSize: 14, opacity: 0.85 }}>{subtitle}</p>
      </div>

      <p
        style={{
          margin: '18px 0 0',
          fontSize: 14,
          lineHeight: 1.6,
          color: '#1d3158',
        }}
      >
        {description}
      </p>

      {highlights && (
        <div style={{ marginTop: 18 }}>
          <p
            style={{
              margin: '0 0 10px',
              fontFamily: '"Avenir Medium", sans-serif',
              fontSize: 15,
              color: '#1d3158',
            }}
          >
            Lo que incluye:
          </p>
          {highlights.map((item, index) => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 0',
                borderBottom:
                  index < highlights.length - 1 ? '1px solid #edf1f7' : 'none',
              }}
            >
              <CheckCircle size={18} color="#16a34a" />
              <span style={{ fontSize: 14, color: '#24375a' }}>{item}</span>
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}
