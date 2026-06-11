import type { SVGProps } from "react";

// Brand/social icons. lucide-react (v1) dropped brand glyphs, so social marks
// are kept here as inline SVGs.

export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.94 4.6 18.6 19.2c-.25 1.1-.92 1.37-1.86.85l-5.14-3.79-2.48 2.39c-.27.27-.5.5-1.03.5l.37-5.23 9.52-8.6c.41-.37-.09-.57-.64-.2L5.05 12.4l-5.06-1.58c-1.1-.34-1.12-1.1.23-1.63L20.5 3.07c.92-.34 1.72.2 1.44 1.53Z" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.33-.04-1.57-.14-2.88-.14C11.9 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23 12s0-3.85-.49-5.7a2.99 2.99 0 0 0-2.1-2.12C18.55 3.66 12 3.66 12 3.66s-6.55 0-8.41.52A2.99 2.99 0 0 0 1.49 6.3C1 8.15 1 12 1 12s0 3.85.49 5.7c.27 1.02 1.07 1.82 2.1 2.12 1.86.52 8.41.52 8.41.52s6.55 0 8.41-.52a2.99 2.99 0 0 0 2.1-2.12C23 15.85 23 12 23 12ZM9.75 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}
