'use client';
import dynamic from 'next/dynamic';

const toolComponents = {
  'totp': dynamic(() => import('@/components/tools/TotpTool')),
  'password-generator': dynamic(() => import('@/components/tools/PasswordGenTool')),
  'hash-generator': dynamic(() => import('@/components/tools/HashTool')),
  'base64': dynamic(() => import('@/components/tools/Base64Tool')),
  'url-encode-decode': dynamic(() => import('@/components/tools/UrlCodecTool')),
  'html-entity': dynamic(() => import('@/components/tools/HtmlEntityTool')),
  'jwt-decoder': dynamic(() => import('@/components/tools/JwtDecodeTool')),
  'json-formatter': dynamic(() => import('@/components/tools/JsonFormatTool')),
  'json-yaml': dynamic(() => import('@/components/tools/JsonYamlTool')),
  'timestamp-converter': dynamic(() => import('@/components/tools/TimestampTool')),
  'color-converter': dynamic(() => import('@/components/tools/ColorConvertTool')),
  'number-base': dynamic(() => import('@/components/tools/NumberBaseTool')),
  'text-diff': dynamic(() => import('@/components/tools/TextDiffTool')),
  'lorem-ipsum': dynamic(() => import('@/components/tools/LoremTool')),
  'case-converter': dynamic(() => import('@/components/tools/CaseConvertTool')),
  'word-counter': dynamic(() => import('@/components/tools/WordCountTool')),
  'regex-tester': dynamic(() => import('@/components/tools/RegexTestTool')),
  'uuid-generator': dynamic(() => import('@/components/tools/UuidGenTool')),
  'ip-info': dynamic(() => import('@/components/tools/IpInfoTool')),
  'markdown-preview': dynamic(() => import('@/components/tools/MarkdownPreviewTool')),
};

export default function ToolRenderer({ slug }) {
  const Component = toolComponents[slug];
  if (!Component) return <div>Tool not found</div>;
  return <Component />;
}
