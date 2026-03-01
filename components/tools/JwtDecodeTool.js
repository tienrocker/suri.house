'use client';
import { useState } from 'react';

export default function JwtDecodeTool() {
  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [meta, setMeta] = useState([]);

  const decode = (token) => {
    setInput(token);
    const t = token.trim();
    const parts = t.split('.');
    if (parts.length !== 3) { setHeader(''); setPayload(''); setMeta([]); return; }
    try {
      const h = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const p = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      setHeader(JSON.stringify(h, null, 2));
      setPayload(JSON.stringify(p, null, 2));
      const m = [];
      if (p.iat) m.push(['Issued At', new Date(p.iat * 1000).toLocaleString()]);
      if (p.exp) { const d = new Date(p.exp * 1000); m.push(['Expires', d.toLocaleString() + (d < new Date() ? ' ⚠️ EXPIRED' : ' ✅ Valid')]); }
      if (p.sub) m.push(['Subject', p.sub]);
      if (p.iss) m.push(['Issuer', p.iss]);
      if (h.alg) m.push(['Algorithm', h.alg]);
      setMeta(m);
    } catch { setHeader('Invalid JWT'); setPayload(''); setMeta([]); }
  };

  return (
    <div className="tool-io single-col">
      <div className="tool-io-section">
        <label>JWT Token</label>
        <textarea className="tool-textarea" value={input} onChange={e => decode(e.target.value)} placeholder="Paste your JWT here (eyJhbG...)" />
      </div>
      {header && (
        <div className="tool-io">
          <div className="tool-io-section"><label>Header</label><div className="code-output">{header}</div></div>
          <div className="tool-io-section"><label>Payload</label><div className="code-output">{payload}</div></div>
        </div>
      )}
      {meta.length > 0 && (
        <div className="info-grid" style={{ marginTop: 16 }}>
          {meta.map(([l, v]) => (<div key={l} className="info-card"><div className="info-card-label">{l}</div><div className="info-card-value" style={{ fontSize: 13 }}>{v}</div></div>))}
        </div>
      )}
    </div>
  );
}
