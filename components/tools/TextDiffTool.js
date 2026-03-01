'use client';
import { useState } from 'react';

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default function TextDiffTool() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState('');

  const compare = () => {
    const linesA = a.split('\n'), linesB = b.split('\n');
    const max = Math.max(linesA.length, linesB.length);
    let html = '<div class="code-output diff-output" style="max-height:400px;overflow:auto">';
    let added = 0, removed = 0, same = 0;
    for (let i = 0; i < max; i++) {
      const la = linesA[i] ?? '', lb = linesB[i] ?? '';
      const n = String(i + 1).padStart(3, ' ');
      if (la === lb) { html += `<div style="padding:1px 0"><span style="color:var(--text-tertiary);margin-right:8px">${n}</span>${esc(la)}</div>`; same++; }
      else { if (la) { html += `<div class="diff-remove" style="padding:1px 4px"><span style="margin-right:8px">${n}</span>- ${esc(la)}</div>`; removed++; }
        if (lb) { html += `<div class="diff-add" style="padding:1px 4px"><span style="margin-right:8px">${n}</span>+ ${esc(lb)}</div>`; added++; } }
    }
    html += '</div>';
    html += `<div style="margin-top:8px;font-size:13px;color:var(--text-secondary)"><span style="color:var(--success)">+${added}</span> · <span style="color:var(--error)">-${removed}</span> · ${same} unchanged</div>`;
    setResult(html);
  };

  return (
    <div className="tool-io single-col">
      <div className="tool-io">
        <div className="tool-io-section"><label>Original</label><textarea className="tool-textarea" value={a} onChange={e => setA(e.target.value)} placeholder="Original text..." /></div>
        <div className="tool-io-section"><label>Modified</label><textarea className="tool-textarea" value={b} onChange={e => setB(e.target.value)} placeholder="Modified text..." /></div>
      </div>
      <div className="btn-group"><button className="btn btn-primary" onClick={compare}>Compare</button></div>
      {result && <div style={{ marginTop: 16 }} dangerouslySetInnerHTML={{ __html: result }} />}
    </div>
  );
}
