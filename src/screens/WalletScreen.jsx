import React from 'react'
import ResidentCard from '../components/ResidentCard.jsx'
import QRCode from '../components/QRCode.jsx'

const COUPONS = [
  { pct: '−40%', color: '#e8324f', color2: '#c5102c', name: 'Muzeum Mazowieckie', valid: 'Ważny do 30.06.2026' },
  { pct: '−15%', color: '#2f7bd8', color2: '#1f56b0', name: 'Księgarnia Akademicka', valid: 'Ważny do 12.08.2026' },
]

export default function WalletScreen() {
  return (
    <div className="scr" style={{ height: '100%', overflowY: 'auto', background: '#F4F6FB', padding: '58px 20px 16px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: -120, left: -90, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(11,30,63,.1),transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#0B1E3F', letterSpacing: '-.02em' }}>Portfel</div>
        <div style={{ width: 46, height: 46, borderRadius: 15, background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.8)', boxShadow: '0 4px 14px rgba(11,30,63,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="ms" style={{ fontSize: 23, color: '#0B1E3F' }}>add</span>
        </div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: '#7b88a3', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 2px 12px' }}>Karta mieszkańca</div>
      <ResidentCard compact />

      {/* transit ticket */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '26px 2px 12px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#7b88a3', textTransform: 'uppercase', letterSpacing: '.08em' }}>Bilety komunikacyjne</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#D81E3F' }}>Kup bilet</div>
      </div>
      <div style={{ position: 'relative', borderRadius: 22, background: '#fff', padding: 18, boxShadow: '0 10px 24px rgba(11,30,63,.07)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: -9, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, borderRadius: '50%', background: '#F4F6FB' }} />
        <div style={{ position: 'absolute', right: -9, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, borderRadius: '50%', background: '#F4F6FB' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: '#e7eefc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="ms" style={{ fontSize: 24, color: '#2f6bd8' }}>confirmation_number</span>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0B1E3F' }}>Bilet 30-dniowy</div>
              <div style={{ fontSize: 12, color: '#7b88a3', fontWeight: 500, marginTop: 2 }}>Strefa 1+2 · Warszawa</div>
            </div>
          </div>
          <div style={{ padding: '5px 11px', borderRadius: 30, background: '#e3f4ea', color: '#1f9d57', fontSize: 12, fontWeight: 800 }}>Ważny</div>
        </div>
        <div style={{ borderTop: '1px dashed rgba(11,30,63,.14)', margin: '16px -4px 0', paddingTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: '#9aa7bd', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>Ważny do</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1E3F', marginTop: 2 }}>14 lipca 2026, 23:59</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#2f6bd8', fontSize: 13, fontWeight: 700 }}>
            Pokaż QR<span className="ms" style={{ fontSize: 17 }}>qr_code_2</span>
          </div>
        </div>
      </div>

      {/* coupons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '26px 2px 12px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#7b88a3', textTransform: 'uppercase', letterSpacing: '.08em' }}>Kupony rabatowe</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#7b88a3' }}>3 dostępne</div>
      </div>

      {COUPONS.map((c, i) => (
        <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'stretch', borderRadius: 20, background: '#fff', overflow: 'hidden', boxShadow: '0 8px 20px rgba(11,30,63,.06)', marginBottom: 13 }}>
          <div style={{ width: 78, flex: 'none', background: `linear-gradient(160deg,${c.color},${c.color2})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{c.pct}</div>
            <div style={{ fontSize: 9, fontWeight: 600, opacity: .85, marginTop: 3 }}>RABAT</div>
          </div>
          <div style={{ borderLeft: '2px dashed rgba(11,30,63,.12)' }} />
          <div style={{ flex: 1, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1E3F' }}>{c.name}</div>
              <div style={{ fontSize: 12, color: '#7b88a3', fontWeight: 500, marginTop: 3 }}>{c.valid}</div>
            </div>
            <button style={{ padding: '8px 14px', borderRadius: 30, background: '#0B1E3F', color: '#fff', fontSize: 13, fontWeight: 700 }}>Użyj</button>
          </div>
        </div>
      ))}
      <div style={{ height: 8 }} />
    </div>
  )
}
