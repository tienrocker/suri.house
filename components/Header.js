'use client';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-left">
        <button className="hamburger" id="hamburger" aria-label="Toggle sidebar"
          onClick={() => {
            document.getElementById('sidebar')?.classList.toggle('open');
            document.getElementById('sidebarOverlay')?.classList.toggle('active');
          }}>☰</button>
        <Link href="/" className="logo">
          <div className="logo-icon">⚡</div>
          <div className="logo-text">James<span>Workspace</span></div>
        </Link>
      </div>
      <div className="header-center">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" id="searchInput" placeholder="Search tools…" autoComplete="off" spellCheck="false" />
          <span className="search-shortcut">Ctrl+K</span>
        </div>
      </div>
      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
