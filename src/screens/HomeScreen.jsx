import React, { useState } from 'react'
import ResidentCard from '../components/ResidentCard.jsx'

const CATEGORIES = [
  { icon: 'directions_bus', label: 'Transport', color: '#2f6bd8', bg: '#e7eefc' },
  { icon: 'theater_comedy', label: 'Kultura', color: '#7d4bd0', bg: '#efe8fb' },
  { icon: 'exercise', label: 'Sport', color: '#1f9d57', bg: '#e3f4ea' },
  { icon: 'school', label: 'Edukacja', color: '#d9930f', bg: '#fdf0dc' },
  { icon: 'health_and_safety', label: 'Zdrowie', color: '#D81E3F', bg: '#fde7ec' },
  { icon: 'restaurant', label: 'Gastronomia', color: '#e07a1f', bg: '#fdeede' },
]

const PROMOS = [
  {
    bg: 'repeating-linear-gradient(135deg,#dde5f1 0 11px,#e8edf6 11px 22px)',
    badgeColor: '#D81E3F', badge: '−50%',
    cat: 'Kultura', catColor: '#7d4bd0',
    title: 'Teatr Polski — bilety wieczorne',
    location: 'Warszawa · 1,2 km',
    photoLabel: 'zdjęcie · teatr',
  },
  {
    bg: 'repeating-linear-gradient(135deg,#dde9e2 0 11px,#e8f1ec 11px 22px)',
    badgeColor: '#1f9d57', badge: '−30%',
    cat: 'Sport', catColor: '#1f9d57',
    title: 'Aquapark — wstęp weekendowy',
    location: 'Płock · 4,8 km',
    photoLabel: 'zdjęcie · basen',
  },
]

export default function HomeScreen({ onOpenOffer }) {
  return (
    <div className="scr" style={{
      height: '100%', overflowY: 'auto',
      background: 'radial-gradient(900px 600px at 20% -10%, #eaf0fb 0%, #e4e9f4 40%, #e0e5f0 100%)',
      padding: '58px 20px 16px',
      position: 'relative',
    }}>
      {/* ambient blobs */}
      <div style={{ position: 'fixed', top: -120, right: -100, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle,rgba(216,30,63,.14),transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: -60, left: -110, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(11,30,63,.12),transparent 65%)', pointerEvents: 'none' }} />

      {/* top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 16,
            background: 'repeating-linear-gradient(135deg,#dbe2ee 0 7px,#e7ecf5 7px 14px)',
            boxShadow: '0 4px 12px rgba(11,30,63,.12)', border: '2px solid #fff',
          }} />
          <div>
            <div style={{ fontSize: 12, color: '#7b88a3', fontWeight: 500 }}>Dzień dobry,</div>
            <div style={{ fontSize: 17, color: '#0B1E3F', fontWeight: 700 }}>Anna Kowalska</div>
          </div>
        </div>
        <div style={{ position: 'relative', width: 46, height: 46, borderRadius: 15, background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.8)', boxShadow: '0 4px 14px rgba(11,30,63,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="ms" style={{ fontSize: 23, color: '#0B1E3F' }}>notifications</span>
          <div style={{ position: 'absolute', top: 9, right: 10, width: 9, height: 9, borderRadius: '50%', background: '#D81E3F', border: '2px solid #fff' }} />
        </div>
      </div>

      {/* search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 50, padding: '0 16px', borderRadius: 16, background: 'rgba(255,255,255,.72)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.85)', boxShadow: '0 6px 18px rgba(11,30,63,.06)', marginBottom: 22 }}>
        <span className="ms" style={{ fontSize: 21, color: '#9aa7bd' }}>search</span>
        <div style={{ fontSize: 14, color: '#9aa7bd', fontWeight: 500 }}>Szukaj zniżek, miejsc, wydarzeń…</div>
      </div>

      <ResidentCard />

      {/* categories */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '26px 2px 14px' }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#0B1E3F' }}>Moje zniżki</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#D81E3F', display: 'flex', alignItems: 'center', gap: 2 }}>
          Wszystkie<span className="ms" style={{ fontSize: 17 }}>chevron_right</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 26 }}>
        {CATEGORIES.map(c => (
          <div key={c.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, padding: '16px 6px', borderRadius: 20, background: '#fff', boxShadow: '0 6px 16px rgba(11,30,63,.05)' }}>
            <div style={{ width: 50, height: 50, borderRadius: 16, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="ms" style={{ fontSize: 25, color: c.color }}>{c.icon}</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#0B1E3F' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* promos */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#0B1E3F' }}>Promocje w pobliżu</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#D81E3F', display: 'flex', alignItems: 'center', gap: 2 }}>
          Mapa<span className="ms" style={{ fontSize: 17 }}>chevron_right</span>
        </div>
      </div>

      <div className="scr" style={{ display: 'flex', gap: 14, overflowX: 'auto', margin: '0 -20px', padding: '0 20px 4px' }}>
        {PROMOS.map(p => (
          <button key={p.title} onClick={() => onOpenOffer({ title: p.title, cat: p.cat, catColor: p.catColor, badge: p.badge })}
            style={{ flex: 'none', width: 218, borderRadius: 22, background: '#fff', overflow: 'hidden', boxShadow: '0 10px 24px rgba(11,30,63,.08)', textAlign: 'left' }}>
            <div style={{ position: 'relative', height: 124, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 11, color: '#9aa7bd' }}>{p.photoLabel}</div>
              <div style={{ position: 'absolute', top: 12, left: 12, padding: '5px 11px', borderRadius: 30, background: p.badgeColor, color: '#fff', fontSize: 12, fontWeight: 800 }}>{p.badge}</div>
            </div>
            <div style={{ padding: '13px 14px 16px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: p.catColor, textTransform: 'uppercase', letterSpacing: '.06em' }}>{p.cat}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1E3F', margin: '4px 0 8px', lineHeight: 1.3 }}>{p.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#7b88a3', fontSize: 12, fontWeight: 500 }}>
                <span className="ms" style={{ fontSize: 15 }}>location_on</span>{p.location}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div style={{ height: 16 }} />
    </div>
  )
}
