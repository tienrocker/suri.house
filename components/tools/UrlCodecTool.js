'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function UrlCodecTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  return (
    <div className="tool-io">
      <div className="tool-io-section">
        <label>Input</label>
        <textarea className="tool-textarea" value={input} onChange={e => setInput(e.target.value)} placeholder="Type or paste URL / text here..." />
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => setOutput(encodeURI(input))}>Encode →</button>
          <button className="btn btn-secondary" onClick={() => { try { setOutput(decodeURIComponent(input)); } catch {} }}>← Decode</button>
          <button className="btn btn-secondary" onClick={() => setOutput(encodeURIComponent(input))}>Component</button>
        </div>
      </div>
      <div className="tool-io-section">
        <label>Output</label>
        <textarea className="tool-textarea readonly" readOnly value={output} placeholder="Result..." />
        <div className="btn-group">
          <button className="btn btn-secondary" onClick={() => copyToClipboard(output)}>📋 Copy</button>
          <button className="btn btn-secondary" onClick={() => { setInput(output); setOutput(input); }}>🔄 Swap</button>
        </div>
      </div>
    </div>
  );
}
