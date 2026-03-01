'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function JsonFormatTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState('2');
  const [status, setStatus] = useState('');

  const format = () => { try { setOutput(JSON.stringify(JSON.parse(input), null, indent === 'tab' ? '\t' : +indent)); setStatus('✓ Valid JSON'); } catch (e) { setStatus('✗ ' + e.message); } };
  const minify = () => { try { setOutput(JSON.stringify(JSON.parse(input))); setStatus('✓ Minified'); } catch (e) { setStatus('✗ ' + e.message); } };

  return (
    <div className="tool-io">
      <div className="tool-io-section">
        <label>Input JSON</label>
        <textarea className="tool-textarea" value={input} onChange={e => setInput(e.target.value)} placeholder='{"key": "value"}' />
        <div className="tool-options" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <label className="tool-option-label">Indent:</label>
          <select className="tool-select" value={indent} onChange={e => setIndent(e.target.value)}>
            <option value="2">2 spaces</option><option value="4">4 spaces</option><option value="tab">Tab</option>
          </select>
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={format}>Format</button>
          <button className="btn btn-secondary" onClick={minify}>Minify</button>
        </div>
      </div>
      <div className="tool-io-section">
        <label>Output</label>
        <textarea className="tool-textarea readonly" readOnly value={output} placeholder="Formatted JSON..." />
        <div className="btn-group"><button className="btn btn-secondary" onClick={() => copyToClipboard(output)}>📋 Copy</button></div>
        {status && <div style={{ marginTop: 8, fontSize: 13, color: status.startsWith('✓') ? 'var(--success)' : 'var(--error)' }}>{status}</div>}
      </div>
    </div>
  );
}
