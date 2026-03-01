import { TOOLS, getToolBySlug, getCategoryById } from '@/lib/tools';
import Link from 'next/link';
import ToolRenderer from './ToolRenderer';

export async function generateStaticParams() {
  return TOOLS.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: 'Tool Not Found' };

  return {
    title: tool.seo.title,
    description: tool.seo.description,
    keywords: tool.seo.keywords,
    openGraph: {
      title: tool.seo.title,
      description: tool.seo.description,
      url: `https://suri.house/tools/${tool.slug}/`,
      siteName: 'James Workspace',
      type: 'website',
      locale: 'vi_VN',
    },
    alternates: {
      canonical: `https://suri.house/tools/${tool.slug}/`,
    },
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return <div className="no-results"><div className="no-results-text">Tool not found</div></div>;

  const category = getCategoryById(tool.category);

  return (
    <div className="tool-page fade-in">
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: tool.name,
            url: `https://suri.house/tools/${tool.slug}/`,
            description: tool.seo.description,
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'VND' },
            author: { '@type': 'Person', name: 'James Tran', email: 'tienrocker@gmail.com', url: 'https://capquanghanoi.com' },
          }),
        }}
      />

      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">›</span>
        <span>{category?.name}</span>
        <span className="sep">›</span>
        <span>{tool.name}</span>
      </nav>

      <div className="tool-page-header">
        <h1><span>{tool.icon}</span> {tool.name}</h1>
        <p>{tool.description}</p>
      </div>

      <div className="tool-workspace">
        <ToolRenderer slug={slug} />
      </div>
    </div>
  );
}
