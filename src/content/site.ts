/**
 * Single source of truth for everything on the site the client will want changed.
 *
 * These are plain exports for now. When the admin UI lands, swap the bodies for
 * data-layer reads — the exported types are the contract the pages depend on, so
 * nothing in `src/components` or `src/app` has to change.
 */

export type Section = {
  /** URL segment, e.g. "about" -> /about */
  slug: string;
  /** Nav label and the word shown on the section's own page */
  label: string;
  /** Background photo in /public/backgrounds */
  image: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type NewsPost = {
  id: string;
  title: string;
  /** ISO date, e.g. "2026-09-03" */
  date: string;
  body: string;
};

export const siteName = "Javier Navarrete";

/** Order matches the bottom nav in the approved design. */
export const sections: Section[] = [
  { slug: "about", label: "ABOUT", image: "/backgrounds/about.webp" },
  { slug: "movies", label: "MOVIES", image: "/backgrounds/movies.webp" },
  { slug: "media", label: "MEDIA", image: "/backgrounds/media.webp" },
  { slug: "opera", label: "OPERA", image: "/backgrounds/opera.webp" },
  { slug: "library", label: "LIBRARY", image: "/backgrounds/library.webp" },
  { slug: "news", label: "NEWS", image: "/backgrounds/news.webp" },
  { slug: "contact", label: "CONTACT", image: "/backgrounds/contact.webp" },
];

export const coverImage = "/backgrounds/cover.webp";

// TODO: replace with the client's real profile URLs.
export const socials: SocialLink[] = [
  { label: "YouTube", href: "#" },
  { label: "Spotify", href: "#" },
  { label: "Apple Music", href: "#" },
];

// TODO: replace with the client's real address.
export const contactEmail = "hello@example.com";

/** Empty until the admin UI can write to it. */
export const newsPosts: NewsPost[] = [];

export function getSection(slug: string): Section {
  const section = sections.find((s) => s.slug === slug);
  if (!section) throw new Error(`Unknown section: ${slug}`);
  return section;
}
