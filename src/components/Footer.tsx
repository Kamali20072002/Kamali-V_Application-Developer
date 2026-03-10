export default function Footer() {
  return (
    <footer>
      <div className="ft">
        © {new Date().getFullYear()} — Built with Next.js & TypeScript
      </div>
      <div className="ft-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src="/logo/kamali_v_favicon.png" alt="Logo" style={{ height: '24px', width: 'auto' }} />
        <span>KV.DEV</span>
      </div>
      <div className="ft">Based in Bangalore, KA</div>
    </footer>
  );
}
