'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

const getWords = t => t.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_\-]+/g, ' ').split(/\s+/).filter(w => w.length > 0);

export default function CaseConvertTool() {
  const [input, setInput] = useState('Hello World Example Text');
  const [output, setOutput] = useState('');

  const convert = (type) => {
    const w = getWords(input);
    const map = {
      upper: () => input.toUpperCase(),
      lower: () => input.toLowerCase(),
      title: () => w.map(x => x[0].toUpperCase() + x.slice(1).toLowerCase()).join(' '),
      camel: () => w.map((x, i) => i === 0 ? x.toLowerCase() : x[0].toUpperCase() + x.slice(1).toLowerCase()).join(''),
      pascal: () => w.map(x => x[0].toUpperCase() + x.slice(1).toLowerCase()).join(''),
      snake: () => w.map(x => x.toLowerCase()).join('_'),
      kebab: () => w.map(x => x.toLowerCase()).join('-'),
      constant: () => w.map(x => x.toUpperCase()).join('_'),
      sentence: () => w.map((x, i) => i === 0 ? x[0].toUpperCase() + x.slice(1).toLowerCase() : x.toLowerCase()).join(' '),
    };
    setOutput(map[type]());
  };

  return (
    <div className="tool-io single-col">
      <div className="tool-io-section"><label>Input Text</label>
        <textarea className="tool-textarea" value={input} onChange={e => setInput(e.target.value)} placeholder="Type text..." />
      </div>
      <div className="btn-group">
        {[['upper', 'UPPERCASE'], ['lower', 'lowercase'], ['title', 'Title Case'], ['camel', 'camelCase'], ['snake', 'snake_case'], ['kebab', 'kebab-case'], ['pascal', 'PascalCase'], ['constant', 'CONSTANT_CASE'], ['sentence', 'Sentence case']].map(([k, l]) => (
          <button key={k} className={`btn ${k === 'upper' || k === 'lower' || k === 'title' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => convert(k)}>{l}</button>
        ))}
      </div>
      <div className="tool-io-section" style={{ marginTop: 16 }}><label>Output</label>
        <textarea className="tool-textarea readonly" readOnly value={output} />
        <div className="btn-group"><button className="btn btn-secondary" onClick={() => copyToClipboard(output)}>📋 Copy</button></div>
      </div>
    </div>
  );
}
