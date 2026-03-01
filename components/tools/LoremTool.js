'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

const words = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum perspiciatis unde omnis iste natus error'.split(' ');
const randWords = n => { const r = []; for (let i = 0; i < n; i++) r.push(words[Math.floor(Math.random() * words.length)]); r[0] = r[0][0].toUpperCase() + r[0].slice(1); return r.join(' '); };
const sentence = () => randWords(8 + Math.floor(Math.random() * 10)) + '.';
const paragraph = () => Array.from({ length: 3 + Math.floor(Math.random() * 4) }, sentence).join(' ');

export default function LoremTool() {
  const [type, setType] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');

  const generate = () => {
    if (type === 'paragraphs') setOutput(Array.from({ length: count }, paragraph).join('\n\n'));
    else if (type === 'sentences') setOutput(Array.from({ length: count }, sentence).join(' '));
    else setOutput(randWords(count) + '.');
  };

  return (
    <div className="tool-io single-col">
      <div className="tool-options">
        <label className="tool-option-label">Type:</label>
        <div className="btn-group-toggle">
          {['paragraphs', 'sentences', 'words'].map(t => (
            <button key={t} className={`btn-toggle ${type === t ? 'active' : ''}`} onClick={() => setType(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>
        <label className="tool-option-label">Count:</label>
        <input className="tool-input" type="number" value={count} onChange={e => setCount(+e.target.value)} min={1} max={100} style={{ width: 80, height: 36 }} />
        <button className="btn btn-primary" onClick={generate}>Generate</button>
      </div>
      <textarea className="tool-textarea readonly" readOnly value={output} rows={10} />
      <div className="btn-group"><button className="btn btn-secondary" onClick={() => copyToClipboard(output)}>📋 Copy</button></div>
    </div>
  );
}
