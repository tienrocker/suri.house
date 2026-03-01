import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">⚡ James Workspace</span>
          <p>Bộ công cụ lập trình miễn phí — chạy hoàn toàn trên trình duyệt, dữ liệu không bao giờ rời khỏi máy bạn.</p>
        </div>
        <div className="footer-links">
          <h4>Liên kết</h4>
          <a href="https://capquanghanoi.com" target="_blank" rel="noopener noreferrer">capquanghanoi.com</a>
          <a href="mailto:tienrocker@gmail.com">tienrocker@gmail.com</a>
        </div>
        <div className="footer-links">
          <h4>Công cụ phổ biến</h4>
          <Link href="/tools/base64/">Base64 Encode / Decode</Link>
          <Link href="/tools/json-formatter/">JSON Formatter</Link>
          <Link href="/tools/totp/">2FA TOTP Generator</Link>
          <Link href="/tools/url-encode-decode/">URL Encode / Decode</Link>
          <Link href="/tools/hash-generator/">Hash Generator</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024–2026 James Tran. All tools run client-side — your data never leaves your browser.</p>
        <p>A project by <a href="https://capquanghanoi.com" target="_blank" rel="noopener noreferrer">capquanghanoi.com</a></p>
      </div>
    </footer>
  );
}
