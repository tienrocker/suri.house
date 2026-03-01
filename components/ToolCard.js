import Link from 'next/link';

export default function ToolCard({ tool }) {
  return (
    <Link href={`/tools/${tool.slug}/`} className="tool-card">
      <div className="tool-card-icon">{tool.icon}</div>
      <div className="tool-card-title">{tool.name}</div>
      <div className="tool-card-desc">{tool.description}</div>
      <span className="tool-card-tag">{tool.tag}</span>
    </Link>
  );
}
