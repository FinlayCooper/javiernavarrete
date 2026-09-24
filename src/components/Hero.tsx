import Image from "next/image";
import Link from "next/link";
import BottomNav from "./BottomNav";
import ScrollCue from "./ScrollCue";
import { siteName } from "@/content/site";

type Props = {
  /** Path under /public/backgrounds */
  image: string;
  currentSlug?: string;
  /**
   * Fade the painting in from the ground. Section pages only: the title stays
   * put, so the painting changing is how a nav click reads as a page change.
   */
  fadeIn?: boolean;
  /** The thread hinting there is content below the fold. */
  showScrollCue?: boolean;
};

/**
 * One full viewport: full-bleed painting, the name centred (and linking home)
 * on every page, nav pinned near the bottom. Matches the 16:9 frame in
 * cover/web cover.pdf.
 */
export default function Hero({ image, currentSlug, fadeIn = false, showScrollCue = false }: Props) {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      <div className={`absolute inset-0 ${fadeIn ? "animate-hero-in" : ""}`}>
        <Image
          src={image}
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* The crops are already very dark; this is just enough to keep type legible. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/15 bg-gradient-to-t from-black/55 via-transparent to-transparent"
      />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <h1 className="text-center text-display font-normal tracking-[0.09em] text-balance">
          <Link
            href="/"
            className="text-cream transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none"
          >
            {siteName.toUpperCase()}
          </Link>
        </h1>
      </div>

      <BottomNav currentSlug={currentSlug} />
      {showScrollCue ? <ScrollCue /> : null}
    </section>
  );
}
