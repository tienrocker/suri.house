'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16); });

export default function UuidGenTool() {
  const [count, setCount] = useState(1);
  const [upper, setUpper] = useState(false);
  const [noDash, setNoDash] = useState(false);
  const [output, setOutput] = useState('');

  const generate = () => {
    const uuids = Array.from({ length: count }, () => {
      let u = uuidv4();
      if (noDash) u = u.replace(/-/g, '');
      if (upper) u = u.toUpperCase();
      return u;
    });
    setOutput(uuids.join('\n'));
  };

  useState(() => { generate(); });

  return (
    <div className="tool-io single-col">
      <div className="tool-options">
        <label className="tool-option-label">Count:</label>
        <input className="tool-input" type="number" value={count} onChange={e => setCount(+e.target.value)} min={1} max={100} style={{ width: 80, height: 36 }} />
        <label className="checkbox-label"><input type="checkbox" checked={upper} onChange={e => setUpper(e.target.checked)} /> Uppercase</label>
        <label className="checkbox-label"><input type="checkbox" checked={noDash} onChange={e => setNoDash(e.target.checked)} /> No dashes</label>
        <button className="btn btn-primary" onClick={generate}>Generate</button>
      </div>
      <textarea className="tool-textarea readonly" readOnly value={output} rows={6} />
      <div className="btn-group"><button className="btn btn-secondary" onClick={() => copyToClipboard(output)}>📋 Copy All</button></div>
    </div>
  );
}
