'use client';
import { useState } from 'react';

export default function WordCountTool() {
  const [text, setText] = useState('');
  const chars = text.length;
  const charsNo = text.replace(/\s/g, '').length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length || (text.trim() ? 1 : 0) : 0;
  const lines = text ? text.split('\n').length : 0;
  const reading = wordCount >= 200 ? Math.ceil(wordCount / 200) + ' min' : wordCount > 0 ? '< 1 min' : '0s';

  return (
    <div className="tool-io single-col">
      <div className="tool-io-section"><label>Input Text</label>
        <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Type or paste text..." />
      </div>
      <div className="info-grid">
        {[['Characters', chars], ['Chars (no spaces)', charsNo], ['Words', wordCount], ['Sentences', sentences], ['Lines', lines], ['Reading Time', reading]].map(([l, v]) => (
          <div key={l} className="info-card"><div className="info-card-label">{l}</div><div className="info-card-value">{v}</div></div>
        ))}
      </div>
    </div>
  );
}
