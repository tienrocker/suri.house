'use client';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CATEGORIES, TOOLS } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';

export default function HomePage() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(TOOLS);

  useEffect(() => {
    const input = document.getElementById('searchInput');
    if (!input) return;
    const handler = (e) => {
      setSearch(e.target.value);
    };
    input.addEventListener('input', handler);

    // Keyboard shortcut
    const keyHandler = (e) => {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        input.focus();
      }
    };
    document.addEventListener('keydown', keyHandler);
    return () => {
      input.removeEventListener('input', handler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, []);

  useEffect(() => {
    let tools = TOOLS;
    if (category !== 'all') {
      tools = tools.filter(t => t.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      tools = tools.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tag.toLowerCase().includes(q)
      );
    }
    setFiltered(tools);
  }, [search, category]);

  if (search.trim()) {
    return (
      <div className="fade-in">
        <div className="category-header">
          <h2>🔍 Search results for &ldquo;{search}&rdquo;</h2>
          <p>{filtered.length} tool{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        {filtered.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <div className="no-results-text">No tools found</div>
          </div>
        ) : (
          <div className="tools-grid">
            {filtered.map(t => <ToolCard key={t.slug} tool={t} />)}
          </div>
        )}
      </div>
    );
  }

  // When a specific category is selected, show only that category
  if (category !== 'all') {
    const cat = CATEGORIES.find(c => c.id === category);
    return (
      <div className="fade-in">
        <div className="category-header">
          <h2><span className="cat-icon">{cat?.icon}</span> {cat?.name}</h2>
          <p>{cat?.description}</p>
        </div>
        {filtered.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">📦</div>
            <div className="no-results-text">No tools in this category</div>
          </div>
        ) : (
          <div className="tools-grid">
            {filtered.map(t => <ToolCard key={t.slug} tool={t} />)}
          </div>
        )}
      </div>
    );
  }

  // Default: show all categories
  const cats = CATEGORIES.filter(c => c.id !== 'all');
  return (
    <div className="fade-in">
      {cats.map(cat => {
        const catTools = TOOLS.filter(t => t.category === cat.id);
        if (catTools.length === 0) return null;
        return (
          <div key={cat.id}>
            <div className="category-header">
              <h2><span className="cat-icon">{cat.icon}</span> {cat.name}</h2>
              <p>{cat.description}</p>
            </div>
            <div className="tools-grid">
              {catTools.map(t => <ToolCard key={t.slug} tool={t} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
