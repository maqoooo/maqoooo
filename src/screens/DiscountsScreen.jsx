import React, { useState } from 'react'

const CHIPS = ['Wszystkie', 'Transport', 'Kultura', 'Sport']

const ITEMS = [
  { icon: 'directions_bus', iconColor: '#1E88E5', iconBg: '#e7f2fd', name: 'Koleje Mazowieckie', sub: 'Transport · ważne bezterminowo', badge: '−25%', badgeColor: '#1E88E5', badgeBg: '#e7f2fd' },
  { icon: 'theater_comedy', iconColor: '#7d4bd0', iconBg: '#efe8fb', name: 'Mazowiecki Teatr Muzyczny', sub: 'Kultura · do 31.12.2026', badge: '−40%', badgeColor: '#7d4bd0', badgeBg: '#efe8fb' },
  { icon: 'exercise', iconColor: '#1f9d57', iconBg: '#e3f4ea', name: 'Centrum Sportu OSiR', sub: 'Sport · karnet miesięczny', badge: '−35%', badgeColor: '#1f9d57', badgeBg: '#e3f4ea' },
  { icon: 'restaurant', iconColor: '#e07a1f', iconBg: '#fdeede', name: 'Bistro Wisła', sub: 'Gastronomia · pon–pt', badge: '−15%', badgeColor: '#e07a1f', badgeBg: '#fdeede' },
]

const FEATURED = {
  title: 'Filharmonia Mazowiecka',
  sub: 'Bilety na koncerty symfoniczne',
  badge: '−60%',
  cat: 'Kultura',
  catColor: '#7d4bd0',
}

export default function DiscountsScreen({ onOpenOffer }) {
  const [activeChip, setActiveChip] = useState('Wszystkie')

  return (
    <div className="scr" style={{ height: '100%', overflowY: 'auto', background: '#EEF6FD', padding: '58px 20px 16px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: -120, right: -90, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(41,160,240,.18),transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#0B1E3F', letterSpacing: '-.02em' }}>Zniżki</div>
        <div style={{ width: 46, height: 46, borderRadius: 15, background: 'rgba(255,255,255,.8)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.9)', boxShadow: '0 4px 14px rgba(11,30,63,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="ms" style={{ fontSize: 23, color: '#1E88E5' }}>tune</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 50, padding: '0 16px', borderRadius: 16, background: 'rgba(255,255,255,.82)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.9)', boxShadow: '0 6px 18px rgba(30,136,229,.08)', marginBottom: 16 }}>
        <span className="ms" style={{ fontSize: 21, color: '#9aa7bd' }}>search</span>
        <div style={{ fontSize: 14, color: '#9aa7bd', fontWeight: 500 }}>Szukaj wśród 1 240 zniżek…</div>
      </div>

      <div className="scr" style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -20px 20px', padding: '0 20px 2px' }}>
        {CHIPS.map(chip => {
          const active = chip === activeChip
          return (
            <button key={chip} onClick={() => setActiveChip(chip)} style={{
              flex: 'none', padding: '8px 15px', borderRadius: 30,
              background: active ? 'linear-gradient(145deg,#29A0F0,#1E7FD6)' : '#fff',
              color: active ? '#fff' : '#0B1E3F',
              fontSize: 13, fontWeight: active ? 700 : 600,
              border: active ? 'none' : '1px solid rgba(11,30,63,.08)',
              boxShadow: active ? '0 6px 14px rgba(30,127,214,.32)' : 'none',
            }}>{chip}</button>
          )
        })}
      </div>

      {/* featured */}
      <button onClick={() => onOpenOffer(FEATURED)}
        style={{ width: '100%', textAlign: 'left', position: 'relative', borderRadius: 24, padding: 20, overflow: 'hidden', background: 'linear-gradient(140deg,#2BA6F2 0%,#1E7FD6 55%,#1768BE 100%)', boxShadow: '0 20px 40px -16px rgba(30,127,214,.5)', marginBottom: 22, border: 'none', cursor: 'pointer' }}>
        <div style={{ position: 'absolute', top: -50, right: -40, width: 170, height: 170, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,.22),transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 30, background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.25)' }}>
            <span className="ms" style={{ fontSize: 15, color: '#fff' }}>bolt</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>Oferta tygodnia</span>
          </div>
          <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', margin: '14px 0 4px', letterSpacing: '-.01em' }}>Filharmonia Mazowiecka</div>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.85)' }}>Bilety na koncerty symfoniczne</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 18 }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: '#fff', lineHeight: 1 }}>−60<span style={{ fontSize: 24 }}>%</span></div>
            <div style={{ padding: '10px 18px', borderRadius: 14, background: '#fff', color: '#1E7FD6', fontSize: 14, fontWeight: 700, boxShadow: '0 8px 18px rgba(0,0,0,.18)' }}>Aktywuj</div>
          </div>
        </div>
      </button>

      <div style={{ fontSize: 13, fontWeight: 700, color: '#7b88a3', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 2px 12px' }}>Popularne w pobliżu</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {ITEMS.map(item => (
          <button key={item.name} onClick={() => onOpenOffer({ title: item.name, cat: item.sub, catColor: item.iconColor, badge: item.badge })}
            style={{ display: 'flex', alignItems: 'center', gap: 13, padding: 13, borderRadius: 18, background: '#fff', boxShadow: '0 8px 20px rgba(30,136,229,.06)', textAlign: 'left', border: 'none', cursor: 'pointer', width: '100%' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <span className="ms" style={{ fontSize: 24, color: item.iconColor }}>{item.icon}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0B1E3F' }}>{item.name}</div>
              <div style={{ fontSize: 12, color: '#7b88a3', fontWeight: 500, marginTop: 2 }}>{item.sub}</div>
            </div>
            <div style={{ padding: '6px 11px', borderRadius: 30, background: item.badgeBg, color: item.badgeColor, fontSize: 13, fontWeight: 800, flex: 'none' }}>{item.badge}</div>
          </button>
        ))}
      </div>
      <div style={{ height: 16 }} />
    </div>
  )
}
