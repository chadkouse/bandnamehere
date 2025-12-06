'use client';

import Bandname from './Bandname';

type ModalType = 'intro' | 'events' | 'about' | 'contact' | 'promo';

type HeaderProps = {
  onOpenModal?: (modal: ModalType) => void;
};

export default function Header({ onOpenModal }: HeaderProps) {
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
        className="w-[4.75rem] h-[4.75rem] sm:w-22 sm:h-22 leading-19 sm:leading-22 relative mt-0 transition-opacity duration-[325ms] ease-in-out border border-white rounded-full"
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
        className="max-w-full transition-opacity duration-[325ms] ease-in-out border-t border-b border-white"
      >
        <div
          className="header-content-inner overflow-hidden px-0 py-10 sm:px-8 sm:py-12 max-h-[40rem] transition-[max-height,padding,opacity] duration-[750ms] ease-linear delay-[250ms]"
        >
          <Bandname />
          <div className="uppercase text-base leading-8 sm:leading-8 tracking-[0.2rem]">
            <div>The area&apos;s best party band!</div>
            <div>Come party with we who party for a living!</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="transition-opacity duration-[325ms] ease-in-out"
      >
      <span className="bg-white inline-block h-8 sm:h-14 w-px">&nbsp;</span>
        <ul
          className="flex flex-col sm:flex-row mb-0 list-none pl-0 rounded min-w-40 sm:min-w-0 max-w-full overflow-hidden border border-white"
        >
          {[
            { id: 'intro' as ModalType, label: 'Intro' },
            { id: 'events' as ModalType, label: 'Events' },
            { id: 'about' as ModalType, label: 'Pics/Vids' },
            { id: 'contact' as ModalType, label: 'Contact' },
            { id: 'promo' as ModalType, label: 'Promo/Tech' },
          ].map((item, index) => (
            <li
              key={item.id}
              className={`flex items-center justify-center pl-0 sm:min-w-36 transition-colors border-t sm:border-t-0 first:border-t-0 bg-black/50 hover:bg-black border-white ${index > 0 ? 'sm:border-l' : ''}`}
            >
              <button
                onClick={() => onOpenModal?.(item.id)}
                className="sm:min-w-30 h-12 sm:h-11 uppercase text-sm transition-colors w-full min-w-0 border-0 bg-transparent cursor-pointer text-white tracking-[0.2rem]"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
