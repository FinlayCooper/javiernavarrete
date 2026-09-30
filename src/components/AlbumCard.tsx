import Image from "next/image";
import TrackPlayer from "./TrackPlayer";
import { FlowerGlyph } from "./Glyph";
import { linkClass } from "./linkClass";
import type { Album } from "@/content/site";

/**
 * A library album: cover, title, then description, player and links, always on
 * display. The client first asked for the cover to expand into these,
 * then asked for them to stay open "so info is always out".
 *
 * Cover art has not been sent yet, so a cover-less album shows a titled tile of
 * the same square proportion — the layout is final, only the image is pending.
 */
export default function AlbumCard({ album }: { album: Album }) {
  return (
    <li className="w-full">
      <div className="relative aspect-square w-full overflow-hidden border border-cream/15 bg-black/40">
        {album.cover ? (
          <Image
            src={album.cover}
            alt={`${album.title} cover`}
            fill
            sizes="(max-width: 640px) 88vw, 340px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
            <FlowerGlyph className="text-cream/25" size={30} />
            <span className="text-[0.65rem] uppercase tracking-[0.22em] text-cream/30">
              Cover to come
            </span>
          </div>
        )}
      </div>

      <h2 className="mt-4 text-center text-lg tracking-[0.12em] text-cream sm:text-xl">
        {album.title}
      </h2>

      <div className="mt-5 space-y-5">
        <p className="text-sm leading-relaxed text-cream/80 sm:text-base">
          {album.description}
        </p>

        {album.track ? (
          <TrackPlayer {...album.track} />
        ) : null}

        {/*
          Two jobs, two rows: streaming for listeners, then licensing split by
          territory. The subgrid lines the links up in columns across both rows.
        */}
        <dl className="grid grid-cols-[auto_1fr_1fr] gap-x-6 gap-y-3 pt-1 text-sm sm:text-base">
          <div className="col-span-3 grid grid-cols-subgrid items-baseline">
            <dt className="italic text-cream/45">Listen</dt>
            {album.listen.map((link) => (
              <dd key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Listen to ${album.title} on ${link.label}`}
                  className={linkClass}
                >
                  {link.label}
                </a>
              </dd>
            ))}
          </div>
          <div className="col-span-3 grid grid-cols-subgrid items-baseline">
            <dt className="italic text-cream/45">License</dt>
            {album.license.map((link) => (
              <dd key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  title={`Through ${link.library}`}
                  aria-label={`License ${album.title}, ${link.label}, through ${link.library}`}
                  className={linkClass}
                >
                  {link.label}
                </a>
              </dd>
            ))}
          </div>
        </dl>
      </div>
    </li>
  );
}
