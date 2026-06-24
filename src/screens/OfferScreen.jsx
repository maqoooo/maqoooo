import React from 'react'
import QRCode from '../components/QRCode.jsx'

const DEFAULT = {
  title: 'Filharmonia Mazowiecka',
  cat: 'Kultura',
  catColor: '#7d4bd0',
  catIcon: 'theater_comedy',
  badge: '−60%',
}

export default function OfferScreen({ data, onBack }) {
  const d = data || DEFAULT
  const catIcon = d.catIcon || 'local_offer'

  return (
    <div style={{ height: '100%', position: 'relative', background: '#EEF6FD', overflow: 'hidden' }}>
      {/* hero */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 280, background: 'linear-gradient(160deg,#2BA6F2,#1768BE)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(135deg,rgba(255,255,255,.06) 0 16px,transparent 16px 32px)' }} />
        <div style={{ position: 'absolute', bottom: 18, left: 20, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 11, color: 'rgba(255,255,255,.6)' }}>zdjęcie · {d.title}</div>
      </div>

      {/* top buttons */}
      <div style={{ position: 'absolute', top: 56, left: 18, zIndex: 9 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,.18)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span className="ms" style={{ fontSize: 23, color: '#fff' }}>arrow_back</span>
        </button>
      </div>
      <div style={{ position: 'absolute', top: 56, right: 18, zIndex: 9 }}>
        <button style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,.18)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span className="ms" style={{ fontSize: 23, color: '#fff' }}>favorite</span>
        </button>
      </div>

      {/* scrollable sheet */}
      <div className="scr" style={{ position: 'absolute', top: 256, left: 0, right: 0, bottom: 0, overflowY: 'auto', borderRadius: '28px 28px 0 0', background: '#EEF6FD', padding: '22px 20px 40px', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 30, background: '#efe8fb' }}>
            <span className="ms" style={{ fontSize: 15, color: d.catColor || '#7d4bd0' }}>{catIcon}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: d.catColor || '#7d4bd0' }}>{d.cat}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f5a623' }}>
            <span className="ms" style={{ fontSize: 17, fontVariationSettings: "'FILL' 1,'wght' 500,'GRAD' 0,'opsz' 24" }}>star</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0B1E3F' }}>4,9</span>
            <span style={{ fontSize: 12, color: '#7b88a3', fontWeight: 500 }}>(312)</span>
          </div>
        </div>

        <div style={{ fontSize: 23, fontWeight: 800, color: '#0B1E3F', margin: '14px 0 6px', letterSpacing: '-.01em' }}>{d.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#7b88a3', fontSize: 13, fontWeight: 500 }}>
          <span className="ms" style={{ fontSize: 16 }}>location_on</span>ul. Sienkiewicza 12, Warszawa · 1,2 km
        </div>

        {/* discount banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderRadius: 18, background: 'linear-gradient(140deg,#2BA6F2,#1E7FD6)', padding: 16, margin: '18px 0', boxShadow: '0 14px 30px -14px rgba(30,127,214,.5)' }}>
          <div style={{ fontSize: 34, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{d.badge}</div>
          <div style={{ width: 1, height: 38, background: 'rgba(255,255,255,.3)' }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Zniżka z Kartą Mieszkańca</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.82)', fontWeight: 500, marginTop: 2 }}>na bilety symfoniczne</div>
          </div>
        </div>

        <div style={{ fontSize: 14, lineHeight: 1.6, color: '#445069', fontWeight: 500 }}>
          Pokaż kod QR przy kasie biletowej, aby skorzystać ze zniżki na koncerty symfoniczne i kameralne. Oferta dostępna dla aktywnych posiadaczy Karty Mieszkańca Mazowsza.
        </div>

        {/* qr code card */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14, borderRadius: 18, background: '#fff', border: '1.5px dashed #9cc8ee', padding: 16, margin: '20px 0', boxShadow: '0 8px 20px rgba(30,136,229,.06)' }}>
          <div style={{ width: 64, height: 64, borderRadius: 12, background: '#fff', border: '1px solid #e3edf7', padding: 5, flex: 'none' }}>
            <QRCode size={54} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9aa7bd', textTransform: 'uppercase', letterSpacing: '.06em' }}>Kod zniżki</div>
            <div style={{ fontSize: 19, fontWeight: 800, color: '#0B1E3F', letterSpacing: '.12em', marginTop: 3 }}>MZ-FIL60</div>
          </div>
          <span className="ms" style={{ fontSize: 22, color: '#1E88E5' }}>content_copy</span>
        </div>

        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', height: 56, borderRadius: 18, background: 'linear-gradient(145deg,#29A0F0,#1E7FD6)', color: '#fff', fontSize: 16, fontWeight: 700, boxShadow: '0 14px 28px -10px rgba(30,127,214,.55)', border: 'none', cursor: 'pointer' }}>
          <span className="ms" style={{ fontSize: 22 }}>qr_code_2</span>Aktywuj zniżkę
        </button>
      </div>
    </div>
  )
}
