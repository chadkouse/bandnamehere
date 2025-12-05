'use client';

import Link from 'next/link';
import Bandname from './Bandname';

export default function Header() {
  return (
    <header
      id="header"
      className="flex flex-col items-center max-w-full text-center relative z-10 sm:px-0 px-0"
      style={{
        backgroundImage:
          'radial-gradient(rgba(0, 0, 0, 0.25) 25%, rgba(0, 0, 0, 0) 55%)',
      }}
    >
      {/* Logo */}
      <div
        className="w-[4.75rem] h-[4.75rem] sm:w-22 sm:h-22 leading-19 sm:leading-22 relative mt-0 transition-opacity"
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: '50%',
          transitionDuration: 'var(--duration-article)',
          transitionTimingFunction: 'ease-in-out',
        }}
      >
        <div
          className="absolute left-[0.3rem] top-[0.4rem] w-16 h-16 sm:left-2 sm:top-2.5 sm:w-18 sm:h-18 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/punch-icon.png)' }}
          role="img"
          aria-label="Party Punch Logo"
        />
      </div>

      {/* Content */}
      <span className="h-8 sm:h-14 inline-block bg-white w-px">&nbsp;</span>
      <div
        className="max-w-full transition-opacity"
        style={{
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          transitionDuration: 'var(--duration-article)',
          transitionTimingFunction: 'ease-in-out',
        }}
      >
        <div
          className="header-content-inner overflow-hidden px-0 py-10 sm:px-8 sm:py-12"
          style={{
            maxHeight: '40rem',
            transition: 'max-height var(--duration-intro) ease 0.25s, padding var(--duration-intro) ease 0.25s, opacity var(--duration-article) ease-in-out 0.25s',
          }}
        >
          <Bandname />
          <div className="uppercase text-base leading-8 sm:leading-8" style={{ letterSpacing: 'var(--letter-spacing-normal)' }}>
            <div>The area&apos;s best party band!</div>
            <div>Come party with we who party for a living!</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="transition-opacity"
        style={{
          transitionDuration: 'var(--duration-article)',
          transitionTimingFunction: 'ease-in-out',
        }}
      >
      <span className="bg-white inline-block h-8 sm:h-14 w-px">&nbsp;</span>
        <ul
          className="flex flex-col sm:flex-row mb-0 list-none pl-0 rounded min-w-40 sm:min-w-0 max-w-full overflow-hidden"
          style={{ border: '1px solid var(--color-border)' }}
        >
          {[
            { href: '/intro', label: 'Intro' },
            { href: '/events', label: 'Events' },
            { href: '/about', label: 'Pics/Vids' },
            { href: '/contact', label: 'Contact' },
            { href: '/promo', label: 'Promo/Tech' },
          ].map((item, index) => (
            <li
              key={item.href}
              className={`pl-0 sm:min-w-36 transition-colors border-t sm:border-t-0 first:border-t-0 ${index > 0 ? 'sm:border-l' : ''}`}
              style={{
                backgroundColor: 'var(--color-menu-bg)',
                borderLeftColor: 'var(--color-border)',
                borderTopColor: 'var(--color-border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-menu-bg-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-menu-bg)';
              }}
            >
              <Link
                href={item.href}
                className="block sm:min-w-30 h-12 sm:h-11 leading-12 sm:leading-[2.75rem] uppercase text-sm no-underline hover:bg-(--color-border-bg) active:bg-(--color-border-bg-alt) transition-colors w-full sm:w-auto min-w-0"
                style={{
                  letterSpacing: 'var(--letter-spacing-normal)',
                  color: 'var(--color-fg)',
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
