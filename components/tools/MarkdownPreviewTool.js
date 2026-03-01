'use client';
import { useState, useEffect } from 'react';

const defaultMd = `# Hello Markdown! 🎉

## Features
- **Bold text** and *italic text*
- [Links](https://example.com)
- Inline \`code\` blocks

### Code Block
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

> This is a blockquote

1. Ordered list item 1
2. Ordered list item 2
`;

function simpleMd(text) {
  return '<p>' + text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--accent-light)">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--border-color);margin:12px 0">')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>') + '</p>';
}

export default function MarkdownPreviewTool() {
  const [input, setInput] = useState(defaultMd);
  const [html, setHtml] = useState('');
  const [marked, setMarked] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js';
    script.onload = () => setMarked(window.marked);
    document.head.appendChild(script);
    return () => { try { document.head.removeChild(script); } catch {} };
  }, []);

  useEffect(() => {
    if (marked) setHtml(marked.parse(input));
    else setHtml(simpleMd(input));
  }, [input, marked]);

  return (
    <div className="tool-io">
      <div className="tool-io-section">
        <label>Markdown Input</label>
        <textarea className="tool-textarea" value={input} onChange={e => setInput(e.target.value)} rows={16} style={{ minHeight: 360, fontFamily: 'var(--font-mono)' }} />
      </div>
      <div className="tool-io-section">
        <label>Preview</label>
        <div className="code-output md-preview" style={{ minHeight: 360, overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
