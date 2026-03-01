'use client';
import { useState } from 'react';

function rgbToHsl(r, g, b) { r /= 255; g /= 255; b /= 255; const max = Math.max(r, g, b), min = Math.min(r, g, b); let h, s, l = (max + min) / 2; if (max === min) { h = s = 0; } else { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min); switch (max) { case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break; case g: h = ((b - r) / d + 2) / 6; break; default: h = ((r - g) / d + 4) / 6; } } return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]; }
function hslToRgb(h, s, l) { h /= 360; s /= 100; l /= 100; let r, g, b; if (s === 0) { r = g = b = l; } else { const hue2rgb = (p, q, t) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; }; const q = l < 0.5 ? l * (1 + s) : l + s - l * s; const p = 2 * l - q; r = hue2rgb(p, q, h + 1 / 3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1 / 3); } return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]; }

export default function ColorConvertTool() {
  const [hex, setHex] = useState('#7c3aed');
  const [rgb, setRgb] = useState('rgb(124, 58, 237)');
  const [hsl, setHsl] = useState('hsl(262, 83%, 58%)');

  const updateFromHex = (h) => {
    h = h.replace(/^#/, ''); if (h.length === 3) h = h.split('').map(c => c + c).join('');
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return;
    const r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
    const hl = rgbToHsl(r, g, b); setHex('#' + h); setRgb(`rgb(${r}, ${g}, ${b})`); setHsl(`hsl(${hl[0]}, ${hl[1]}%, ${hl[2]}%)`);
  };

  return (
    <div className="tool-io single-col">
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
        <div style={{ width: 80, height: 80, borderRadius: 12, border: '2px solid var(--border-color)', background: hex }} />
        <input type="color" value={hex} onChange={e => updateFromHex(e.target.value)} style={{ width: 60, height: 40, border: 'none', cursor: 'pointer', background: 'transparent' }} />
      </div>
      <div className="tool-io" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <div className="tool-io-section"><label>HEX</label><input className="tool-input" value={hex} onChange={e => { setHex(e.target.value); updateFromHex(e.target.value); }} /></div>
        <div className="tool-io-section"><label>RGB</label><input className="tool-input" value={rgb} onChange={e => {
          setRgb(e.target.value); const m = e.target.value.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
          if (m) updateFromHex([m[1], m[2], m[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join(''));
        }} /></div>
        <div className="tool-io-section"><label>HSL</label><input className="tool-input" value={hsl} onChange={e => {
          setHsl(e.target.value); const m = e.target.value.match(/(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/);
          if (m) { const r = hslToRgb(+m[1], +m[2], +m[3]); updateFromHex(r.map(x => x.toString(16).padStart(2, '0')).join('')); }
        }} /></div>
      </div>
    </div>
  );
}
