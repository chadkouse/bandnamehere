import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { FaFacebook, FaInstagram, FaCommentDots } from 'react-icons/fa';

// Article content components
export const IntroContent = () => (
  <>
    <span className="relative w-full mb-6 block">
      <Image
        src="/images/pic01.png"
        alt="Party Punch Band"
        width={800}
        height={400}
        className="w-full h-auto"
      />
    </span>
    <p>
      Introducing the new Party Punch band! Some familiar faces and some brand new but
      still partying for a living and still bringing the area&apos;s BEST dance party
      everywhere we go!
      <br /><br />
      Grab a cup and fill it up with PARTY PUNCH.. but most of all SPREAD THE WORD -
      we can&apos;t wait to see you all real soon
    </p>
    <p>
      By the way, check out our <a href="/events">tour schedule</a>.
    </p>
  </>
);

export const EventsContent = () => (
  <>
    <span className="relative w-full mb-6 block">
      <Image
        src="/images/pic02.png"
        alt="Events"
        width={800}
        height={400}
        className="w-full h-auto"
      />
    </span>
    <p>
      What makes a party go from good to GREAT? A big bowl of PARTY PUNCH!
    </p>
    <p>
      If you&apos;re having a wedding, a special birthday party, a class reunion, or any
      other party or event -- PARTY PUNCH can help you take it from good to GREAT.{' '}
      <a href="/contact">Contact Us</a> and we&apos;ll
      help you figure it all out.
    </p>
    <h3 className="w-full text-center">
      <a href="/tour-dates" className="flex items-center justify-center gap-2">
        <Calendar className="text-[#ff43a5]" size={24} />
        CLICK HERE FOR OUR EVENTS CALENDAR!
        <Calendar className="text-[#ff43a5]" size={24} />
      </a>
    </h3>
  </>
);

export const AboutContent = () => (
  <div className="flex flex-col gap-y-4">
    <span className="relative w-full block">
      <Image
        src="/images/pic03.png"
        alt="Media"
        width={800}
        height={400}
        className="w-full h-auto"
      />
    </span>
    <a href="/images/party_punch_band_on_stage.jpg">
      <Image
        src="/images/party_punch_band_on_stage.jpg"
        alt="Party Punch On Stage"
        width={800}
        height={600}
        className="w-full h-auto"
      />
    </a>
    <div className="resp-container w-full">
      <iframe
        src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fpartypunchband%2Fvideos%2F504451034624826%2F&show_text=false&width=560&t=0"
        className="resp-iframe"
        title="Party Punch Practice Video"
        scrolling="no"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </div>
    <div className="resp-container w-full">
      <iframe
        src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fpartypunchband%2Fvideos%2F174023107928134%2F&show_text=false&width=560&t=0"
        className="resp-iframe"
        title="Party Punch Featured Video"
        scrolling="no"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </div>
    <ul className="flex gap-3 list-none pl-0">
      <li>
        <a
          href="https://www.facebook.com/partypunchband"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white hover:bg-white/10 active:bg-white/20 transition-colors text-white"
          aria-label="Facebook"
        >
          <FaFacebook size={18} />
          <span className="sr-only">Facebook</span>
        </a>
      </li>
      <li>
        <a
          href="https://instagram.com/partypunchband"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white hover:bg-white/10 active:bg-white/20 transition-colors text-white"
          aria-label="Instagram"
        >
          <FaInstagram size={18} />
          <span className="sr-only">Instagram</span>
        </a>
      </li>
    </ul>
    <div>
      Check us out on{' '}
      <a href="https://facebook.com/partypunchband">The Facebook</a> or{' '}
      <a href="https://instagram.com/partypunchband">Instagram</a> for more!
    </div>
  </div>
);

export const ContactContent = () => (
  <>
    <p>
      Please find us on{' '}
      <a href="https://www.facebook.com/partypunchband">The Facebook</a>
    </p>
    <ul className="flex gap-3 list-none pl-0">
      <li>
        <a
          href="https://www.facebook.com/partypunchband"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white hover:bg-white/10 active:bg-white/20 transition-colors text-color border-solid!"
          aria-label="Facebook"
        >
          <FaFacebook size={18} />
          <span className="sr-only">Facebook</span>
        </a>
      </li>
      <li>
        <a
          href="https://m.me/partypunchband"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white hover:bg-white/10 active:bg-white/20 transition-colors text-white border-solid!"
          aria-label="Facebook Messenger"
        >
          <FaCommentDots size={18} />
          <span className="sr-only">Facebook Messenger</span>
        </a>
      </li>
    </ul>
  </>
);

export const PromoContent = () => (
  <div className="flex flex-col gap-y-4">
    <div>
      <p>Party Punch Band Picture</p>
      <Image
        src="/images/party_punch_band_photo.png"
        alt="Party Punch Band"
        width={600}
        height={400}
        className="w-4/5"
      />
      <p>
        <a href="/images/party_punch_band_photo.png" download>
          Hi-Res Version
        </a>
      </p>
    </div>
    <div>
      <p>STAGE PLOT</p>
      <a href="/images/party_punch_stage_plot.jpg" target="_blank" rel="noopener noreferrer">
        <Image
          src="/images/party_punch_stage_plot.jpg"
          alt="Stage Plot"
          width={600}
          height={400}
          className="w-4/5"
        />
      </a>
      <p>
        <a href="/images/party_punch_stage_plot.pdf" download>PDF Version</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="/images/party_punch_stage_plot.jpg" download>JPG Version</a>
      </p>
    </div>
    <div className="flex flex-col gap-y-4">
      <p>Logos</p>
      <p>
        Color with color background<br />
        <Image src="/images/party_punch_color_logo_thumb.png" alt="Color Logo" width={100} height={100} />
        <a href="/images/party_punch_color_logo.png" download>PNG Version</a>
      </p>
      <p>
        Color with transparent background<br />
        <Image src="/images/party_punch_logo_color_thumb.png" alt="Color Logo Transparent" width={100} height={100} />
        <a href="/images/party_punch_logo_color.png" download>PNG Version</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="/images/party_punch_logo_color.svg" download>SVG Version</a>
      </p>
      <p>
        One-Color with transparent background<br />
        <Image src="/images/party_punch_logo_one_color_thumb.png" alt="One Color Logo" width={100} height={100} />
        <a href="/images/party_punch_logo_one_color.png" download>PNG Version</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="/images/party_punch_logo_one_color.svg" download>SVG Version</a>
      </p>
    </div>
  </div>
);
