'use client';
import { useState, useMemo } from 'react';

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default function RegexTestTool() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('gi');
  const [input, setInput] = useState('The quick brown fox jumps over 42 lazy dogs at 3:15pm on 2024-01-15.');

  const { highlighted, matches, error } = useMemo(() => {
    if (!pattern) return { highlighted: '', matches: [], error: null };
    try {
      const regex = new RegExp(pattern, flags);
      const ms = []; let match, lastIndex = 0, html = '';
      if (flags.includes('g')) {
        while ((match = regex.exec(input)) !== null) { ms.push(match); html += esc(input.slice(lastIndex, match.index)) + '<span class="regex-match">' + esc(match[0]) + '</span>'; lastIndex = regex.lastIndex; if (match.index === regex.lastIndex) regex.lastIndex++; }
      } else { match = regex.exec(input); if (match) { ms.push(match); html += esc(input.slice(0, match.index)) + '<span class="regex-match">' + esc(match[0]) + '</span>'; lastIndex = match.index + match[0].length; } }
      html += esc(input.slice(lastIndex));
      return { highlighted: html, matches: ms, error: null };
    } catch (e) { return { highlighted: '', matches: [], error: e.message }; }
  }, [pattern, flags, input]);

  return (
    <div className="tool-io single-col">
      <div className="tool-io-section">
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}><label>Regular Expression</label>
            <input className="tool-input" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="e.g. \\d+" style={{ fontFamily: 'var(--font-mono)' }} />
          </div>
          <div style={{ width: 100 }}><label>Flags</label>
            <input className="tool-input" value={flags} onChange={e => setFlags(e.target.value)} style={{ fontFamily: 'var(--font-mono)' }} />
          </div>
        </div>
      </div>
      <div className="tool-io-section"><label>Test String</label>
        <textarea className="tool-textarea" value={input} onChange={e => setInput(e.target.value)} />
      </div>
      <div className="tool-io-section"><label>Matches</label>
        {error ? <div className="code-output" style={{ color: 'var(--error)' }}>Invalid regex: {error}</div>
          : <div className="code-output" dangerouslySetInnerHTML={{ __html: highlighted || '<span style="color:var(--text-tertiary)">Enter a regex pattern</span>' }} />}
      </div>
      {matches.length > 0 && (
        <div className="tool-io-section"><label>Details ({matches.length} match{matches.length > 1 ? 'es' : ''})</label>
          <div className="code-output" style={{ maxHeight: 200, overflow: 'auto' }}>
            {matches.map((m, i) => (
              <div key={i} style={{ marginBottom: 4 }}>
                <span style={{ color: 'var(--accent-light)' }}>Match {i + 1}:</span> &quot;{esc(m[0])}&quot; <span style={{ color: 'var(--text-tertiary)' }}>(index {m.index})</span>
                {m.length > 1 && Array.from({ length: m.length - 1 }, (_, g) => (
                  <div key={g} style={{ paddingLeft: 16, color: 'var(--text-secondary)' }}>Group {g + 1}: &quot;{esc(m[g + 1] || '')}&quot;</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
