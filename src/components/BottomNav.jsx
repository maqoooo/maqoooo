import React from 'react'

const TABS = [
  { id: 'home', icon: 'home', label: 'Główna' },
  { id: 'discounts', icon: 'sell', label: 'Zniżki' },
  { id: 'map', icon: 'map', label: 'Mapa' },
  { id: 'wallet', icon: 'account_balance_wallet', label: 'Portfel' },
  { id: 'profile', icon: 'person', label: 'Profil' },
]

export default function BottomNav({ active, onChange }) {
  return (
    <div style={{
      position: 'relative',
      zIndex: 10,
      padding: '0 14px 14px',
      background: 'transparent',
    }}>
      <div style={{
        height: 68,
        borderRadius: 26,
        background: 'rgba(255,255,255,.88)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        border: '1px solid rgba(255,255,255,.9)',
        boxShadow: '0 12px 30px rgba(11,30,63,.14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 6px',
      }}>
        {TABS.map(t => {
          const isActive = active === t.id
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                color: isActive ? '#0B1E3F' : '#9aa7bd',
                padding: '8px 12px',
                transition: 'color .15s',
              }}
            >
              <span
                className="ms"
                style={{
                  fontSize: 25,
                  fontVariationSettings: isActive
                    ? "'FILL' 1,'wght' 600,'GRAD' 0,'opsz' 24"
                    : "'FILL' 0,'wght' 500,'GRAD' 0,'opsz' 24",
                }}
              >{t.icon}</span>
              <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 600 }}>{t.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
