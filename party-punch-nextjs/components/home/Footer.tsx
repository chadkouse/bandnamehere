export default function Footer() {
  return (
    <footer
      id="footer"
      className="text-center py-4 transition-opacity"
      style={{
        transitionDuration: 'var(--duration-article)',
        transitionTimingFunction: 'ease-in-out',
      }}
    >
      <p className="text-sm" style={{ color: 'var(--color-fg-light)' }}>
        &copy; Party Punch Band. Design:{' '}
        <a href="https://html5up.net" className="border-b border-dotted">
          HTML5 UP
        </a>
        . Built with:{' '}
        <a href="https://nextjs.org/" className="border-b border-dotted">
          Next.js
        </a>
      </p>
    </footer>
  );
}
