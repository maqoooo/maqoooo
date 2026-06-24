import React, { useState } from 'react'

const PINS = [
  { top: 235, left: 96, icon: 'restaurant', color: '#D81E3F', cat: 'Gastronomia' },
  { top: 175, left: 225, icon: 'theater_comedy', color: '#7d4bd0', cat: 'Kultura' },
  { top: 330, left: 175, icon: 'exercise', color: '#1f9d57', cat: 'Sport' },
  { top: 285, left: 285, icon: 'directions_bus', color: '#2f6bd8', cat: 'Transport' },
]

const PLACES = [
  { name: 'Restauracja Mazowiecka', cat: 'Gastronomia · otwarte · 320 m', discount: '−20%', discountColor: '#D81E3F', discountBg: '#fde7ec', bg: 'repeating-linear-gradient(135deg,#dde5f1 0 7px,#e8edf6 7px 14px)' },
  { name: 'Teatr Dramatyczny', cat: 'Kultura · do 22:00 · 850 m', discount: '−50%', discountColor: '#7d4bd0', discountBg: '#efe8fb', bg: 'repeating-linear-gradient(135deg,#efe6f8 0 7px,#f3edfa 7px 14px)' },
  { name: 'Aquapark Płock', cat: 'Sport · otwarte · 4,8 km', discount: '−30%', discountColor: '#1f9d57', discountBg: '#e3f4ea', bg: 'repeating-linear-gradient(135deg,#dde9e2 0 7px,#e8f1ec 7px 14px)' },
]

const CHIPS = ['Wszystkie', 'Gastronomia', 'Kultura', 'Sport']

export default function MapScreen({ onOpenOffer }) {
  const [activeChip, setActiveChip] = useState('Wszystkie')

  return (
    <div style={{ height: '100%', position: 'relative', background: '#dde6ef', overflow: 'hidden' }}>
      {/* faux map */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#e9eef5,#dfe6ef)' }} />
      <div style={{ position: 'absolute', top: 120, left: -40, width: 240, height: 180, borderRadius: '50%', background: '#cfe4d6', opacity: .7 }} />
      <div style={{ position: 'absolute', top: 430, right: -60, width: 260, height: 200, borderRadius: '46% 54% 60% 40%', background: '#c7dced', opacity: .8 }} />
      <div style={{ position: 'absolute', top: 300, left: 120, width: 120, height: 120, borderRadius: 30, background: '#d3e6da', opacity: .6 }} />
      {/* roads */}
      <div style={{ position: 'absolute', top: 0, left: 120, width: 18, height: '100%', background: '#f3f6fa', transform: 'rotate(11deg)', transformOrigin: 'top' }} />
      <div style={{ position: 'absolute', top: 240, left: -40, width: '140%', height: 16, background: '#f3f6fa', transform: 'rotate(-7deg)' }} />
      <div style={{ position: 'absolute', top: 560, left: -40, width: '140%', height: 14, background: '#f3f6fa', transform: 'rotate(5deg)' }} />
      <div style={{ position: 'absolute', top: 0, left: 270, width: 10, height: '100%', background: '#f3f6fa', transform: 'rotate(-6deg)', transformOrigin: 'top' }} />

      {/* pins */}
      {PINS.map((p, i) => (
        <button key={i} onClick={() => onOpenOffer({ title: p.cat, cat: p.cat, catColor: p.color, badge: '−25%' })}
          style={{ position: 'absolute', top: p.top, left: p.left, border: 'none', background: 'none', cursor: 'pointer', filter: 'drop-shadow(0 6px 8px rgba(11,30,63,.3))' }}>
          <div style={{ background: p.color, width: 38, height: 38, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
            <span className="ms" style={{ fontSize: 19, color: '#fff', transform: 'rotate(45deg)', display: 'block', fontVariationSettings: "'FILL' 0,'wght' 500,'GRAD' 0,'opsz' 24" }}>{p.icon}</span>
          </div>
        </button>
      ))}
      {/* user dot */}
      <div style={{ position: 'absolute', top: 400, left: 185, width: 22, height: 22, borderRadius: '50%', background: '#2f6bd8', border: '3px solid #fff', boxShadow: '0 0 0 6px rgba(47,107,216,.18),0 4px 10px rgba(11,30,63,.3)' }} />

      {/* floating search + chips */}
      <div style={{ position: 'absolute', top: 58, left: 16, right: 16, zIndex: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 50, padding: '0 14px', borderRadius: 16, background: 'rgba(255,255,255,.88)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,.9)', boxShadow: '0 10px 26px rgba(11,30,63,.16)' }}>
          <span className="ms" style={{ fontSize: 21, color: '#0B1E3F' }}>search</span>
          <div style={{ fontSize: 14, color: '#7b88a3', fontWeight: 500, flex: 1 }}>Szukaj punktów partnerskich</div>
          <span className="ms" style={{ fontSize: 21, color: '#D81E3F' }}>tune</span>
        </div>
        <div className="scr" style={{ display: 'flex', gap: 8, overflowX: 'auto', marginTop: 12, paddingBottom: 2 }}>
          {CHIPS.map(chip => {
            const active = chip === activeChip
            return (
              <button key={chip} onClick={() => setActiveChip(chip)} style={{
                flex: 'none', padding: '8px 15px', borderRadius: 30,
                background: active ? '#0B1E3F' : 'rgba(255,255,255,.9)',
                color: active ? '#fff' : '#0B1E3F',
                fontSize: 13, fontWeight: active ? 700 : 600,
                border: active ? 'none' : '1px solid rgba(11,30,63,.08)',
                boxShadow: active ? '0 6px 14px rgba(11,30,63,.22)' : 'none',
              }}>{chip}</button>
            )
          })}
        </div>
      </div>

      {/* locate button */}
      <div style={{ position: 'absolute', right: 18, bottom: 330, width: 48, height: 48, borderRadius: 16, background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: '0 8px 20px rgba(11,30,63,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 6 }}>
        <span className="ms" style={{ fontSize: 24, color: '#2f6bd8' }}>my_location</span>
      </div>

      {/* bottom sheet */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 7, borderRadius: '28px 28px 0 0', background: '#fff', boxShadow: '0 -16px 40px rgba(11,30,63,.18)', padding: '12px 20px 16px' }}>
        <div style={{ width: 44, height: 5, borderRadius: 5, background: '#dbe2ec', margin: '0 auto 14px' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0B1E3F' }}>5 punktów w pobliżu</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7b88a3' }}>Sortuj</div>
        </div>
        {PLACES.map(p => (
          <button key={p.name} onClick={() => onOpenOffer({ title: p.name, cat: p.cat, badge: p.discount })}
            style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '12px 0', borderBottom: '1px solid rgba(11,30,63,.06)', width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid rgba(11,30,63,.06)', cursor: 'pointer' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: p.bg, flex: 'none' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0B1E3F' }}>{p.name}</div>
              <div style={{ fontSize: 12, color: '#7b88a3', fontWeight: 500, marginTop: 2 }}>{p.cat}</div>
            </div>
            <div style={{ padding: '6px 11px', borderRadius: 30, background: p.discountBg, color: p.discountColor, fontSize: 13, fontWeight: 800 }}>{p.discount}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
