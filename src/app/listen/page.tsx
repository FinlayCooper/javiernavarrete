import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import Prose from "@/components/Prose";
import { FlowerGlyph } from "@/components/Glyph";
import { getSection, siteName, socials } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("listen").label} — ${siteName}`,
  description: `Listen to ${siteName} on YouTube, Spotify and Apple Music.`,
};

/**
 * The footer's streaming links, given a page of their own and shown larger —
 * the client wanted "a dedicated space to direct people to streaming platforms".
 */
export default function ListenPage() {
  return (
    <SectionPage slug="listen">
      <Prose>
        <ul className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-2xl uppercase tracking-[0.18em] text-cream transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none sm:text-3xl"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <FlowerGlyph className="mx-auto mt-16 text-cream/25" size={22} />
      </Prose>
    </SectionPage>
  );
}
