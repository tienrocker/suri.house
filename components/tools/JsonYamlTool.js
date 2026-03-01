'use client';
import { useState, useEffect } from 'react';
import { copyToClipboard, showToast } from '@/lib/utils';

export default function JsonYamlTool() {
  const [json, setJson] = useState('');
  const [yaml, setYaml] = useState('');
  const [jsyaml, setJsyaml] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js';
    script.onload = () => setJsyaml(window.jsyaml);
    document.head.appendChild(script);
    return () => { try { document.head.removeChild(script); } catch {} };
  }, []);

  const toYaml = () => { try { if (!jsyaml) return showToast('Loading...', '⏳'); setYaml(jsyaml.dump(JSON.parse(json), { indent: 2 })); } catch (e) { showToast('Invalid JSON', '❌'); } };
  const toJson = () => { try { if (!jsyaml) return showToast('Loading...', '⏳'); setJson(JSON.stringify(jsyaml.load(yaml), null, 2)); } catch (e) { showToast('Invalid YAML', '❌'); } };

  return (
    <div className="tool-io">
      <div className="tool-io-section">
        <label>JSON</label>
        <textarea className="tool-textarea" value={json} onChange={e => setJson(e.target.value)} placeholder='{"key": "value"}' />
        <div className="btn-group"><button className="btn btn-primary" onClick={toYaml}>→ To YAML</button></div>
      </div>
      <div className="tool-io-section">
        <label>YAML</label>
        <textarea className="tool-textarea" value={yaml} onChange={e => setYaml(e.target.value)} placeholder="key: value" />
        <div className="btn-group">
          <button className="btn btn-primary" onClick={toJson}>← To JSON</button>
          <button className="btn btn-secondary" onClick={() => copyToClipboard(yaml || json)}>📋 Copy</button>
        </div>
      </div>
    </div>
  );
}
