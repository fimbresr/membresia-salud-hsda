import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface InteractiveListItem {
  key: string;
  title: string;
  detail?: string;
  leftIcon: ReactNode;
  rightMeta?: ReactNode;
  onClick?: () => void;
}

interface InteractiveListProps {
  items: InteractiveListItem[];
}

export function InteractiveList({ items }: InteractiveListProps) {
  return (
    <div
      style={{
        overflow: 'hidden',
        borderRadius: 24,
        border: '1px solid #e9edf5',
        background: '#ffffff',
        boxShadow: '0 6px 18px rgba(16, 50, 107, 0.05)',
      }}
    >
      {items.map((item, index) => (
        <button
          key={item.key}
          onClick={item.onClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '16px 18px',
            width: '100%',
            border: 0,
            borderBottom: index < items.length - 1 ? '1px solid #edf1f7' : 'none',
            background: '#ffffff',
            borderRadius: 0,
            cursor: item.onClick ? 'pointer' : 'default',
            textAlign: 'left',
          }}
        >
          {item.leftIcon}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontFamily: '"Avenir Medium", sans-serif',
                fontSize: 15,
                color: '#1d3158',
              }}
            >
              {item.title}
            </p>
            {item.detail && (
              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: 13,
                  lineHeight: 1.35,
                  color: '#566e96',
                }}
              >
                {item.detail}
              </p>
            )}
          </div>
          {item.rightMeta}
          {item.onClick && <ChevronRight size={18} color="#a8b5cb" />}
        </button>
      ))}
    </div>
  );
}
