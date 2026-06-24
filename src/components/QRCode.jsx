import React, { useMemo } from 'react'

function buildQR(N = 21) {
  const m = Array.from({ length: N }, () => Array(N).fill(false))
  const finder = (R, C) => {
    for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
      m[R + r][C + c] = r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)
    }
  }
  finder(0, 0); finder(0, N - 7); finder(N - 7, 0)
  let seed = 987654321
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return (seed >> 17) & 1 }
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    if ((r < 8 && c < 8) || (r < 8 && c >= N - 8) || (r >= N - 8 && c < 8)) continue
    m[r][c] = rnd() === 1
  }
  return m
}

export default function QRCode({ size = 104, dark = '#0B1E3F' }) {
  const cells = useMemo(() => buildQR(21).flat(), [])
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(21,1fr)',
      gridTemplateRows: 'repeat(21,1fr)',
      width: size,
      height: size,
    }}>
      {cells.map((on, i) => (
        <div key={i} style={{ background: on ? dark : 'transparent' }} />
      ))}
    </div>
  )
}
