// Tool registry — metadata for all 20 tools
export const CATEGORIES = [
  { id: 'all',       name: 'All Tools',       icon: '📦', description: 'Browse all available developer tools' },
  { id: 'security',  name: 'Security & Auth',  icon: '🔐', description: 'Authentication and cryptography tools' },
  { id: 'encoding',  name: 'Encoding',         icon: '🔤', description: 'Encode and decode data formats' },
  { id: 'formatter', name: 'Formatters',        icon: '🎨', description: 'Format, convert, and validate data' },
  { id: 'text',      name: 'Text Utilities',    icon: '📝', description: 'Text manipulation and analysis' },
  { id: 'web',       name: 'Web & Network',     icon: '🌐', description: 'Web development and network tools' },
];

export const TOOLS = [
  // Security
  {
    slug: 'totp',
    name: '2FA TOTP Generator',
    icon: '🔑',
    category: 'security',
    description: 'Paste a TOTP secret key and get the current 6-digit code with countdown timer',
    tag: 'Security',
    seo: {
      title: '2FA TOTP Generator — Free Online Tool | James Workspace',
      description: 'Generate TOTP 2FA codes from secret keys. Real-time 6-digit code generation with countdown timer. Free, client-side, no data sent to any server.',
      keywords: 'totp generator, 2fa code, authenticator, otp generator, two factor authentication',
    },
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    icon: '🔒',
    category: 'security',
    description: 'Generate strong, random passwords with customizable length and character sets',
    tag: 'Security',
    seo: {
      title: 'Password Generator — Free Online Tool | James Workspace',
      description: 'Generate strong, random passwords instantly. Customize length, include uppercase, lowercase, digits, symbols. Bulk generation supported.',
      keywords: 'password generator, random password, strong password, secure password',
    },
  },
  {
    slug: 'hash-generator',
    name: 'Hash Generator',
    icon: '#️⃣',
    category: 'security',
    description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text input',
    tag: 'Crypto',
    seo: {
      title: 'Hash Generator (MD5, SHA-1, SHA-256, SHA-512) — Free Tool | James Workspace',
      description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text. Real-time computation, copy individual hashes. Free online hash tool.',
      keywords: 'hash generator, md5, sha1, sha256, sha512, checksum',
    },
  },
  // Encoding
  {
    slug: 'base64',
    name: 'Base64 Encode / Decode',
    icon: '🔡',
    category: 'encoding',
    description: 'Encode text to Base64 or decode Base64 back to text',
    tag: 'Encoding',
    seo: {
      title: 'Base64 Encode / Decode — Free Online Tool | James Workspace',
      description: 'Encode text to Base64 or decode Base64 strings back to text. Supports UTF-8. Free, instant, client-side tool.',
      keywords: 'base64 encode, base64 decode, base64 converter, base64 online',
    },
  },
  {
    slug: 'url-encode-decode',
    name: 'URL Encode / Decode',
    icon: '🔗',
    category: 'encoding',
    description: 'Percent-encode or decode URL strings and query parameters',
    tag: 'Encoding',
    seo: {
      title: 'URL Encode / Decode — Free Online Tool | James Workspace',
      description: 'Encode or decode URLs and query parameters with percent-encoding. Supports encodeURI and encodeURIComponent. Free online URL tool.',
      keywords: 'url encode, url decode, percent encoding, url encoder decoder',
    },
  },
  {
    slug: 'html-entity',
    name: 'HTML Entity Encode / Decode',
    icon: '📄',
    category: 'encoding',
    description: 'Convert special characters to HTML entities and vice versa',
    tag: 'Encoding',
    seo: {
      title: 'HTML Entity Encode / Decode — Free Online Tool | James Workspace',
      description: 'Convert special characters to HTML entities and decode HTML entities back to characters. Free online HTML entity tool.',
      keywords: 'html entity, html encode, html decode, html special characters',
    },
  },
  {
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    icon: '🎫',
    category: 'encoding',
    description: 'Decode a JSON Web Token to inspect its header, payload, and expiration',
    tag: 'Encoding',
    seo: {
      title: 'JWT Decoder — Free Online Tool | James Workspace',
      description: 'Decode JSON Web Tokens (JWT) to inspect header, payload, expiration, and claims. No verification, pure client-side decoding.',
      keywords: 'jwt decoder, json web token, jwt parser, jwt viewer',
    },
  },
  // Formatters
  {
    slug: 'json-formatter',
    name: 'JSON Formatter / Validator',
    icon: '📋',
    category: 'formatter',
    description: 'Pretty-print, minify, and validate JSON data with syntax highlighting',
    tag: 'Formatter',
    seo: {
      title: 'JSON Formatter / Validator — Free Online Tool | James Workspace',
      description: 'Format, minify, and validate JSON data. Customizable indentation. Instant validation with error messages. Free online JSON tool.',
      keywords: 'json formatter, json validator, json beautifier, json minifier, json pretty print',
    },
  },
  {
    slug: 'json-yaml',
    name: 'JSON ↔ YAML Converter',
    icon: '🔄',
    category: 'formatter',
    description: 'Convert between JSON and YAML formats seamlessly',
    tag: 'Converter',
    seo: {
      title: 'JSON to YAML Converter — Free Online Tool | James Workspace',
      description: 'Convert JSON to YAML and YAML to JSON seamlessly. Bidirectional conversion with proper formatting. Free online converter.',
      keywords: 'json to yaml, yaml to json, json yaml converter, yaml converter',
    },
  },
  {
    slug: 'timestamp-converter',
    name: 'Unix Timestamp Converter',
    icon: '⏱️',
    category: 'formatter',
    description: 'Convert between Unix timestamps and human-readable dates with timezone support',
    tag: 'Converter',
    seo: {
      title: 'Unix Timestamp Converter — Free Online Tool | James Workspace',
      description: 'Convert Unix timestamps to human-readable dates and vice versa. Supports seconds & milliseconds, shows UTC and local time.',
      keywords: 'unix timestamp, epoch converter, timestamp to date, date to timestamp',
    },
  },
  {
    slug: 'color-converter',
    name: 'Color Converter',
    icon: '🎨',
    category: 'formatter',
    description: 'Convert colors between HEX, RGB, and HSL with a live preview swatch',
    tag: 'Converter',
    seo: {
      title: 'Color Converter (HEX / RGB / HSL) — Free Tool | James Workspace',
      description: 'Convert colors between HEX, RGB, and HSL formats. Live color preview swatch and native color picker. Free online color tool.',
      keywords: 'color converter, hex to rgb, rgb to hsl, color picker, hex rgb hsl',
    },
  },
  {
    slug: 'number-base',
    name: 'Number Base Converter',
    icon: '🔢',
    category: 'formatter',
    description: 'Convert numbers between Decimal, Binary, Octal, and Hexadecimal',
    tag: 'Converter',
    seo: {
      title: 'Number Base Converter — Free Online Tool | James Workspace',
      description: 'Convert numbers between decimal, binary, octal, and hexadecimal. Bidirectional, real-time conversion. Free online base converter.',
      keywords: 'number base converter, decimal to binary, hex to decimal, octal converter',
    },
  },
  // Text
  {
    slug: 'text-diff',
    name: 'Text Diff Checker',
    icon: '📊',
    category: 'text',
    description: 'Compare two text blocks and highlight differences line by line',
    tag: 'Text',
    seo: {
      title: 'Text Diff Checker — Free Online Tool | James Workspace',
      description: 'Compare two text blocks side by side and highlight differences line by line. Shows additions, removals, and unchanged lines.',
      keywords: 'text diff, text compare, diff checker, compare text online',
    },
  },
  {
    slug: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    icon: '📜',
    category: 'text',
    description: 'Generate placeholder text by paragraphs, sentences, or words',
    tag: 'Generator',
    seo: {
      title: 'Lorem Ipsum Generator — Free Online Tool | James Workspace',
      description: 'Generate Lorem Ipsum placeholder text by paragraphs, sentences, or word count. Customizable output for design and development.',
      keywords: 'lorem ipsum generator, placeholder text, dummy text, lipsum',
    },
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    icon: 'Aa',
    category: 'text',
    description: 'Convert text between UPPER, lower, Title, camelCase, snake_case, kebab-case',
    tag: 'Text',
    seo: {
      title: 'Case Converter — Free Online Tool | James Workspace',
      description: 'Convert text between uppercase, lowercase, title case, camelCase, snake_case, kebab-case, PascalCase, and more.',
      keywords: 'case converter, text case, camelcase, snake case, uppercase lowercase',
    },
  },
  {
    slug: 'word-counter',
    name: 'Word & Character Counter',
    icon: '🔢',
    category: 'text',
    description: 'Count words, characters, sentences, lines, and estimated reading time',
    tag: 'Text',
    seo: {
      title: 'Word & Character Counter — Free Online Tool | James Workspace',
      description: 'Count words, characters, sentences, lines, and estimated reading time. Real-time text analysis tool.',
      keywords: 'word counter, character counter, word count, text counter',
    },
  },
  {
    slug: 'regex-tester',
    name: 'Regex Tester',
    icon: '🔍',
    category: 'text',
    description: 'Test regular expressions with real-time match highlighting and capture groups',
    tag: 'Text',
    seo: {
      title: 'Regex Tester — Free Online Tool | James Workspace',
      description: 'Test regular expressions with real-time match highlighting, capture group details, and configurable flags. Free online regex tool.',
      keywords: 'regex tester, regular expression, regex online, regex match, regex test',
    },
  },
  // Web
  {
    slug: 'uuid-generator',
    name: 'UUID Generator',
    icon: '🆔',
    category: 'web',
    description: 'Generate random v4 UUIDs individually or in bulk',
    tag: 'Generator',
    seo: {
      title: 'UUID Generator — Free Online Tool | James Workspace',
      description: 'Generate random v4 UUIDs instantly. Bulk generation, uppercase option, no-dash format. Cryptographically random.',
      keywords: 'uuid generator, uuid v4, random uuid, guid generator',
    },
  },
  {
    slug: 'ip-info',
    name: 'IP Address Info',
    icon: '📡',
    category: 'web',
    description: 'Display your public IP address and basic geolocation information',
    tag: 'Network',
    seo: {
      title: 'IP Address Info — Free Online Tool | James Workspace',
      description: 'View your public IP address with geolocation details: city, region, country, timezone, ISP, and coordinates.',
      keywords: 'ip address, my ip, ip info, ip geolocation, what is my ip',
    },
  },
  {
    slug: 'markdown-preview',
    name: 'Markdown Preview',
    icon: '📝',
    category: 'web',
    description: 'Write markdown and preview the rendered HTML output in real-time',
    tag: 'Web',
    seo: {
      title: 'Markdown Preview — Free Online Tool | James Workspace',
      description: 'Write markdown and see the rendered HTML preview in real-time. Supports headings, lists, code blocks, tables, and more.',
      keywords: 'markdown preview, markdown editor, markdown to html, markdown online',
    },
  },
];

export function getToolBySlug(slug) {
  return TOOLS.find(t => t.slug === slug);
}

export function getToolsByCategory(categoryId) {
  if (categoryId === 'all') return TOOLS;
  return TOOLS.filter(t => t.category === categoryId);
}

export function getCategoryById(id) {
  return CATEGORIES.find(c => c.id === id);
}
