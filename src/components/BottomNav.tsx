import Link from "next/link";
import { sections } from "@/content/site";

type Props = {
  /** Slug of the page currently being viewed, if any. */
  currentSlug?: string;
};

/**
 * The seven section links. In the PDF these sit on unevenly spaced Pages tab
 * stops; an evenly gapped centred row reads the same and survives resizing.
 */
export default function BottomNav({ currentSlug }: Props) {
  return (
    <nav
      aria-label="Sections"
      className="absolute inset-x-0 bottom-[6%] z-20 px-4"
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-[3.5vw] gap-y-3 text-nav tracking-[0.14em]">
        {sections.map((section) => {
          const isCurrent = section.slug === currentSlug;
          return (
            <li key={section.slug}>
              <Link
                href={`/${section.slug}`}
                aria-current={isCurrent ? "page" : undefined}
                className={`transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none ${
                  isCurrent
                    ? "text-cream underline underline-offset-[0.4em] decoration-from-font"
                    : "text-cream/80"
                }`}
              >
                {section.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
