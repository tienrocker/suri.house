'use client';
import { useState } from 'react';

export default function NumberBaseTool() {
  const [vals, setVals] = useState({ dec: '', bin: '', oct: '', hex: '' });
  const update = (key, value, base) => {
    const n = { ...vals, [key]: value };
    const num = parseInt(value, base);
    if (!isNaN(num) && value) {
      if (key !== 'dec') n.dec = num.toString(10);
      if (key !== 'bin') n.bin = num.toString(2);
      if (key !== 'oct') n.oct = num.toString(8);
      if (key !== 'hex') n.hex = num.toString(16).toUpperCase();
    } else if (!value) { n.dec = ''; n.bin = ''; n.oct = ''; n.hex = ''; n[key] = ''; }
    setVals(n);
  };
  return (
    <div className="tool-io" style={{ gridTemplateColumns: '1fr 1fr' }}>
      {[['dec', 'Decimal (Base 10)', 10, '255'], ['bin', 'Binary (Base 2)', 2, '11111111'], ['oct', 'Octal (Base 8)', 8, '377'], ['hex', 'Hexadecimal (Base 16)', 16, 'FF']].map(([k, label, base, ph]) => (
        <div key={k} className="tool-io-section"><label>{label}</label>
          <input className="tool-input" value={vals[k]} onChange={e => update(k, e.target.value, base)} placeholder={ph} spellCheck="false" />
        </div>
      ))}
    </div>
  );
}
