'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function TotpTool() {
  const [secret, setSecret] = useState('');
  const [code, setCode] = useState('------');
  const [remaining, setRemaining] = useState(30);
  const [active, setActive] = useState(false);
  const intervalRef = useRef(null);

  const hmacSha1 = useCallback(async (key, data) => {
    const ck = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
    return new Uint8Array(await crypto.subtle.sign('HMAC', ck, data));
  }, []);

  const generateTOTP = useCallback(async (s) => {
    const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = '';
    for (let i = 0; i < s.length; i++) {
      const val = base32chars.indexOf(s[i]);
      if (val === -1) throw new Error('Invalid base32');
      bits += val.toString(2).padStart(5, '0');
    }
    const key = new Uint8Array(Math.floor(bits.length / 8));
    for (let i = 0; i < key.length; i++) key[i] = parseInt(bits.substr(i * 8, 8), 2);

    const time = Math.floor(Date.now() / 1000 / 30);
    const timeBytes = new Uint8Array(8);
    let tmp = time;
    for (let i = 7; i >= 0; i--) { timeBytes[i] = tmp & 0xff; tmp = Math.floor(tmp / 256); }

    const hash = await hmacSha1(key, timeBytes);
    const offset = hash[hash.length - 1] & 0xf;
    const binary = ((hash[offset] & 0x7f) << 24) | (hash[offset + 1] << 16) | (hash[offset + 2] << 8) | hash[offset + 3];
    return (binary % 1000000).toString().padStart(6, '0');
  }, [hmacSha1]);

  const startTotp = useCallback((s) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActive(true);
    const update = async () => {
      try {
        const c = await generateTOTP(s);
        setCode(c);
        setRemaining(30 - (Math.floor(Date.now() / 1000) % 30));
      } catch { setCode('ERROR'); }
    };
    update();
    intervalRef.current = setInterval(update, 1000);
  }, [generateTOTP]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const handleGenerate = () => {
    const s = secret.trim().replace(/\s/g, '').toUpperCase();
    if (!s) return;
    startTotp(s);
  };

  return (
    <div className="tool-io single-col">
      <div className="tool-io-section">
        <label>Secret Key (Base32)</label>
        <input className="tool-input" value={secret} onChange={e => setSecret(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleGenerate()}
          placeholder="e.g. JBSWY3DPEHPK3PXP" autoComplete="off" spellCheck="false" />
        <div className="btn-group">
          <button className="btn btn-primary" onClick={handleGenerate}>Generate Code</button>
        </div>
      </div>
      {active && (
        <div className="tool-io-section">
          <label>Current TOTP Code</label>
          <div className="totp-display" onClick={() => copyToClipboard(code)} style={{ cursor: 'pointer' }}>{code}</div>
          <div className="totp-timer"><div className="totp-timer-bar" style={{ width: `${(remaining / 30) * 100}%` }} /></div>
          <div style={{ textAlign: 'center', marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
            Refreshes in {remaining}s
          </div>
        </div>
      )}
    </div>
  );
}
