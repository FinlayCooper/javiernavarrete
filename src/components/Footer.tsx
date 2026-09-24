import Link from "next/link";
import { ArrowGlyph } from "./Glyph";
import { siteName, socials } from "@/content/site";

type Props = {
  /**
   * Show the way back to the cover. Off on the home page itself, where the mark
   * would point at the page you are already on.
   */
  showHomeLink?: boolean;
};

/**
 * Sits below the fold — the hero is exactly one screen, scrolling reveals this.
 */
export default function Footer({ showHomeLink = false }: Props) {
  return (
    <footer className="border-t border-cream/10 bg-ground px-6 py-14">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8">
        {showHomeLink ? (
          <Link
            href="/"
            aria-label={`Back to the ${siteName} cover`}
            className="text-cream/45 transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none"
          >
            <ArrowGlyph size={30} />
          </Link>
        ) : null}

        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm tracking-[0.18em] sm:text-base">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="uppercase text-cream/80 transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-xs tracking-[0.12em] text-cream/40">
          © {new Date().getFullYear()} {siteName}
        </p>
      </div>
    </footer>
  );
}
