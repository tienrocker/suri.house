'use client';
import { useState, useEffect } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function IpInfoTool() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) return <div style={{ textAlign: 'center', padding: 20, color: 'var(--error)' }}>❌ Failed to fetch IP info</div>;
  if (!data) return <div style={{ textAlign: 'center', padding: 20, color: 'var(--text-tertiary)' }}>⏳ Loading...</div>;

  return (
    <div className="tool-io single-col">
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 4 }}>Your Public IP</div>
        <div style={{ fontSize: 32, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', cursor: 'pointer' }} onClick={() => copyToClipboard(data.ip)}>{data.ip || 'Unknown'}</div>
      </div>
      <div className="info-grid">
        {[['City', data.city], ['Region', data.region], ['Country', `${data.country_name || ''} ${data.country || ''}`], ['Timezone', data.timezone], ['ISP', data.org], ['ASN', data.asn], ['Latitude', data.latitude], ['Longitude', data.longitude]].map(([l, v]) => (
          <div key={l} className="info-card"><div className="info-card-label">{l}</div><div className="info-card-value">{v || '—'}</div></div>
        ))}
      </div>
      <div className="btn-group" style={{ justifyContent: 'center', marginTop: 16 }}>
        <button className="btn btn-secondary" onClick={() => copyToClipboard(data.ip)}>📋 Copy IP</button>
        <button className="btn btn-secondary" onClick={() => copyToClipboard(`IP: ${data.ip}\nCity: ${data.city}\nCountry: ${data.country_name}\nISP: ${data.org}`)}>📋 Copy All</button>
      </div>
    </div>
  );
}
