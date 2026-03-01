'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CATEGORIES, TOOLS } from '@/lib/tools';

export default function Sidebar() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'all';

  const closeMobile = () => {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebarOverlay')?.classList.remove('active');
  };

  return (
    <>
      <div className="sidebar-overlay" id="sidebarOverlay" onClick={closeMobile} />
      <nav className="sidebar" id="sidebar">
        {CATEGORIES.map(cat => {
          const count = cat.id === 'all'
            ? TOOLS.length
            : TOOLS.filter(t => t.category === cat.id).length;
          const isActive = cat.id === category;
          return (
            <Link key={cat.id} href={cat.id === 'all' ? '/' : `/?category=${cat.id}`}
              className={`sidebar-item${isActive ? ' active' : ''}`}
              onClick={closeMobile}>
              <span className="item-icon">{cat.icon}</span>
              <span>{cat.name}</span>
              <span className="item-count">{count}</span>
            </Link>
          );
        })}
        <div style={{ borderTop: '1px solid var(--border-color)', margin: '16px 0' }} />
        <div className="sidebar-section-title">Popular Tools</div>
        {TOOLS.slice(0, 5).map(tool => (
          <Link key={tool.slug} href={`/tools/${tool.slug}/`}
            className="sidebar-item"
            onClick={closeMobile}>
            <span className="item-icon">{tool.icon}</span>
            <span style={{ fontSize: '13px' }}>{tool.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
