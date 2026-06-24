import React from 'react'

const SETTINGS = [
  { icon: 'badge', label: 'Dane karty mieszkańca', type: 'arrow' },
  { icon: 'notifications', label: 'Powiadomienia', type: 'toggle' },
  { icon: 'lock', label: 'Prywatność i bezpieczeństwo', type: 'arrow' },
  { icon: 'help', label: 'Pomoc i kontakt', type: 'arrow' },
]

export default function ProfileScreen() {
  return (
    <div style={{ height: '100%', position: 'relative', background: '#EEF6FD', overflow: 'hidden' }}>
      {/* banner */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(160deg,#2BA6F2,#1768BE)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,.18),transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -30, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,.1),transparent 65%)' }} />
      </div>

      {/* title + settings button */}
      <div style={{ position: 'absolute', top: 58, left: 0, right: 0, textAlign: 'center', fontSize: 17, fontWeight: 700, color: '#fff', zIndex: 6 }}>Profil</div>
      <div style={{ position: 'absolute', top: 56, right: 18, zIndex: 8 }}>
        <button style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,.18)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span className="ms" style={{ fontSize: 22, color: '#fff' }}>settings</span>
        </button>
      </div>

      <div className="scr" style={{ position: 'absolute', inset: 0, overflowY: 'auto', padding: '110px 20px 16px', zIndex: 5 }}>
        {/* avatar card */}
        <div style={{ borderRadius: 24, background: '#fff', padding: 22, textAlign: 'center', boxShadow: '0 16px 36px -18px rgba(11,30,63,.28)' }}>
          <div style={{ width: 88, height: 88, borderRadius: 28, margin: '0 auto', background: 'repeating-linear-gradient(135deg,#dbe2ee 0 8px,#e7ecf5 8px 16px)', border: '3px solid #fff', boxShadow: '0 8px 20px rgba(11,30,63,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="ms" style={{ fontSize: 42, color: '#9aa7bd' }}>person</span>
          </div>
          <div style={{ fontSize: 21, fontWeight: 800, color: '#0B1E3F', marginTop: 14, letterSpacing: '-.01em' }}>Anna Kowalska</div>
          <div style={{ fontSize: 13, color: '#7b88a3', fontWeight: 500, marginTop: 3 }}>Mieszkanka Warszawy · od 2024</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, padding: '6px 13px', borderRadius: 30, background: '#e7f2fd' }}>
            <span className="ms" style={{ fontSize: 16, color: '#1E88E5', fontVariationSettings: "'FILL' 1,'wght' 500,'GRAD' 0,'opsz' 24" }}>verified</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#1E88E5' }}>Konto zweryfikowane</span>
          </div>
        </div>

        {/* stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 11, marginTop: 16 }}>
          {[
            { val: '847 zł', label: 'Oszczędności', color: '#1E88E5' },
            { val: '23', label: 'Zniżki', color: '#0B1E3F' },
            { val: '5', label: 'Kupony', color: '#D81E3F' },
          ].map(s => (
            <div key={s.label} style={{ borderRadius: 18, background: '#fff', padding: '16px 8px', textAlign: 'center', boxShadow: '0 8px 20px rgba(30,136,229,.05)' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 11, color: '#7b88a3', fontWeight: 600, marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* settings list */}
        <div style={{ borderRadius: 20, background: '#fff', marginTop: 16, overflow: 'hidden', boxShadow: '0 10px 24px rgba(11,30,63,.06)' }}>
          {SETTINGS.map((s, i) => (
            <button key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 16px', borderBottom: i < SETTINGS.length - 1 ? '1px solid rgba(11,30,63,.05)' : 'none', width: '100%', background: 'none', border: 'none', borderBottom: i < SETTINGS.length - 1 ? '1px solid rgba(11,30,63,.05)' : 'none', textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: '#e7f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <span className="ms" style={{ fontSize: 21, color: '#1E88E5' }}>{s.icon}</span>
              </div>
              <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: '#0B1E3F' }}>{s.label}</div>
              {s.type === 'arrow'
                ? <span className="ms" style={{ fontSize: 21, color: '#c2cbda' }}>chevron_right</span>
                : <div style={{ width: 42, height: 25, borderRadius: 30, background: '#1E88E5', position: 'relative', flex: 'none' }}>
                    <div style={{ position: 'absolute', top: 2.5, right: 2.5, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
                  </div>
              }
            </button>
          ))}
        </div>

        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', height: 52, borderRadius: 18, background: '#fff', color: '#D81E3F', fontSize: 15, fontWeight: 700, marginTop: 14, boxShadow: '0 8px 20px rgba(11,30,63,.05)', border: 'none', cursor: 'pointer' }}>
          <span className="ms" style={{ fontSize: 21 }}>logout</span>Wyloguj się
        </button>
        <div style={{ height: 16 }} />
      </div>
    </div>
  )
}
