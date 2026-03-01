'use client';
import { useState, useRef } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function HtmlEntityTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const encode = () => { const d = document.createElement('div'); d.appendChild(document.createTextNode(input)); setOutput(d.innerHTML); };
  const decode = () => { const d = document.createElement('div'); d.innerHTML = input; setOutput(d.textContent || ''); };
  return (
    <div className="tool-io">
      <div className="tool-io-section">
        <label>Input</label>
        <textarea className="tool-textarea" value={input} onChange={e => setInput(e.target.value)} placeholder='e.g. <div class="hello">' />
        <div className="btn-group">
          <button className="btn btn-primary" onClick={encode}>Encode →</button>
          <button className="btn btn-secondary" onClick={decode}>← Decode</button>
        </div>
      </div>
      <div className="tool-io-section">
        <label>Output</label>
        <textarea className="tool-textarea readonly" readOnly value={output} placeholder="Result..." />
        <div className="btn-group"><button className="btn btn-secondary" onClick={() => copyToClipboard(output)}>📋 Copy</button></div>
      </div>
    </div>
  );
}
