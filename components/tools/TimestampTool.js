'use client';
import { useState, useEffect, useRef } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function TimestampTool() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [tsInput, setTsInput] = useState('');
  const [unit, setUnit] = useState('s');
  const [dateInput, setDateInput] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const tsToDate = () => {
    if (!tsInput) return '—';
    const ts = unit === 'ms' ? parseInt(tsInput) : parseInt(tsInput) * 1000;
    const d = new Date(ts);
    if (isNaN(d.getTime())) return 'Invalid';
    return `${d.toLocaleString()}\nUTC: ${d.toUTCString()}\nISO: ${d.toISOString()}`;
  };

  const dateToTs = () => {
    if (!dateInput) return '—';
    const d = new Date(dateInput);
    return `Seconds: ${Math.floor(d.getTime() / 1000)}\nMilliseconds: ${d.getTime()}`;
  };

  return (
    <div className="tool-io single-col">
      <div className="tool-io-section">
        <label>Current Unix Timestamp</label>
        <div className="code-output" style={{ fontSize: 20, fontWeight: 600, cursor: 'pointer', minHeight: 32 }} onClick={() => copyToClipboard(String(now))}>{now}</div>
      </div>
      <div className="tool-io" style={{ marginTop: 16 }}>
        <div className="tool-io-section">
          <label>Unix Timestamp → Date</label>
          <input className="tool-input" value={tsInput} onChange={e => setTsInput(e.target.value)} placeholder="e.g. 1700000000" type="number" />
          <div className="btn-group-toggle" style={{ marginTop: 8 }}>
            <button className={`btn-toggle ${unit === 's' ? 'active' : ''}`} onClick={() => setUnit('s')}>Seconds</button>
            <button className={`btn-toggle ${unit === 'ms' ? 'active' : ''}`} onClick={() => setUnit('ms')}>Milliseconds</button>
          </div>
          <div className="code-output" style={{ marginTop: 8, minHeight: 32 }}>{tsToDate()}</div>
        </div>
        <div className="tool-io-section">
          <label>Date → Unix Timestamp</label>
          <input className="tool-input" type="datetime-local" value={dateInput} onChange={e => setDateInput(e.target.value)} />
          <div className="code-output" style={{ marginTop: 8, minHeight: 32 }}>{dateToTs()}</div>
          <div className="btn-group">
            <button className="btn btn-secondary" onClick={() => { const n = new Date(); const o = n.getTimezoneOffset(); const l = new Date(n.getTime() - o * 60000); setDateInput(l.toISOString().slice(0, 16)); }}>Set to Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
