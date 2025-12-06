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
      <p className="text-sm text-white/50">
        &copy; Party Punch Band. Design:{' '}
        <a href="https://html5up.net" className="border-b border-dotted">
          HTML5 UP
        </a>
        . Built with:{' '}
        <a href="https://nextjs.org/" className="border-b border-dotted">
          Next.js
        </a>
      </p>
      <p className="text-sm text-white/50">All rights reserved.  All wrongs reserved.</p>
    </footer>
  );
}
