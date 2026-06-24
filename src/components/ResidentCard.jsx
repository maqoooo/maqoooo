import React from 'react'
import QRCode from './QRCode.jsx'

export default function ResidentCard({ compact = false }) {
  const qrSize = compact ? 62 : 104
  return (
    <div style={{
      position: 'relative',
      borderRadius: 24,
      padding: compact ? 20 : 22,
      overflow: 'hidden',
      background: 'linear-gradient(145deg,#16335f 0%,#0B1E3F 55%,#0a1730 100%)',
      boxShadow: compact ? '0 22px 44px -16px rgba(11,30,63,.5)' : '0 22px 44px -14px rgba(11,30,63,.55)',
    }}>
      <div style={{
        position: 'absolute', top: -50, right: -40, width: 180, height: 180,
        borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(216,30,63,.45),transparent 65%)',
        pointerEvents: 'none',
      }} />
      {!compact && (
        <div style={{
          position: 'absolute', bottom: -70, left: -30, width: 160, height: 160,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(255,255,255,.08),transparent 65%)',
          pointerEvents: 'none',
        }} />
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: compact ? 32 : 34, height: compact ? 32 : 34,
            borderRadius: compact ? 9 : 10,
            background: 'linear-gradient(145deg,#e8324f,#c5102c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, color: '#fff', fontSize: compact ? 17 : 18,
            boxShadow: '0 4px 10px rgba(216,30,63,.45)',
          }}>M</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Karta Mieszkańca</div>
            {!compact && (
              <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.55)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                Województwo Mazowieckie
              </div>
            )}
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: compact ? 6 : 7,
          padding: compact ? '5px 10px' : '6px 11px 6px 9px',
          borderRadius: 30,
          background: 'rgba(255,255,255,.12)',
          border: '1px solid rgba(255,255,255,.18)',
        }}>
          <div style={{
            width: compact ? 7 : 8, height: compact ? 7 : 8,
            borderRadius: '50%', background: '#34C759',
            animation: 'pulseDot 2s infinite',
          }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>Aktywna</span>
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: compact ? 22 : 26 }}>
        <div>
          {!compact && <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '.1em' }}>Posiadacz</div>}
          <div style={{ fontSize: compact ? 18 : 21, fontWeight: 700, color: '#fff', margin: compact ? '0 0 8px' : '3px 0 16px' }}>Anna Kowalska</div>
          {!compact && <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '.1em' }}>Numer karty</div>}
          <div style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: compact ? 'rgba(255,255,255,.7)' : '#fff', letterSpacing: '.16em', marginTop: compact ? 0 : 3 }}>
            MZ 0042 1187 6035
          </div>
          {!compact && <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', marginTop: 10 }}>Ważna do 12 / 2027</div>}
        </div>
        <div style={{ background: '#fff', padding: compact ? 7 : 9, borderRadius: compact ? 13 : 16, boxShadow: '0 10px 24px rgba(0,0,0,.28)' }}>
          <QRCode size={qrSize} />
        </div>
      </div>
    </div>
  )
}
