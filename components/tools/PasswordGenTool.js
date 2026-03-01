'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function PasswordGenTool() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, digits: true, symbols: true });
  const [password, setPassword] = useState('');
  const [bulk, setBulk] = useState('');

  const generate = () => {
    let charset = '';
    if (opts.upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (opts.lower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (opts.digits) charset += '0123456789';
    if (opts.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!charset) return;
    const gen = (len) => {
      const arr = new Uint32Array(len);
      crypto.getRandomValues(arr);
      return Array.from(arr).map(x => charset[x % charset.length]).join('');
    };
    setPassword(gen(length));
    setBulk(Array.from({ length: 5 }, () => gen(length)).join('\n'));
  };

  useState(() => { generate(); });

  return (
    <div className="tool-io single-col">
      <div className="tool-io-section">
        <label>Password Length: {length}</label>
        <input type="range" className="tool-range" min="4" max="128" value={length}
          onChange={e => setLength(+e.target.value)} />
        <div className="checkbox-group" style={{ marginTop: 12 }}>
          {[['upper', 'Uppercase (A-Z)'], ['lower', 'Lowercase (a-z)'], ['digits', 'Digits (0-9)'], ['symbols', 'Symbols (!@#$...)']].map(([k, label]) => (
            <label key={k} className="checkbox-label">
              <input type="checkbox" checked={opts[k]} onChange={e => setOpts({ ...opts, [k]: e.target.checked })} /> {label}
            </label>
          ))}
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={generate}>Generate Password</button>
          <button className="btn btn-secondary" onClick={() => copyToClipboard(password)}>📋 Copy</button>
        </div>
      </div>
      <div className="tool-io-section">
        <label>Generated Password</label>
        <div className="code-output" style={{ fontSize: 18, letterSpacing: 1, wordBreak: 'break-all', minHeight: 40, display: 'flex', alignItems: 'center' }}>
          {password || 'Click Generate'}
        </div>
      </div>
      <div className="tool-io-section">
        <label>Bulk Generate</label>
        <textarea className="tool-textarea readonly" readOnly value={bulk} rows={5} />
      </div>
    </div>
  );
}
