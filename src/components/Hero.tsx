import Image from "next/image";
import BottomNav from "./BottomNav";

type Props = {
  /** Path under /public/backgrounds */
  image: string;
  /** The large centred word, e.g. "JAVIER NAVARRETE" or "ABOUT" */
  title: string;
  currentSlug?: string;
};

/**
 * One full viewport: full-bleed painting, centred display type, nav pinned near
 * the bottom. Matches the 16:9 frame in cover/web cover.pdf.
 */
export default function Hero({ image, title, currentSlug }: Props) {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* The crops are already very dark; this is just enough to keep type legible. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/15 bg-gradient-to-t from-black/55 via-transparent to-transparent"
      />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <h1 className="text-center text-display font-normal tracking-[0.09em] text-cream text-balance">
          {title}
        </h1>
      </div>

      <BottomNav currentSlug={currentSlug} />
    </section>
  );
}
