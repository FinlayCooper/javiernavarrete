"use client";

import { useState } from "react";
import Image from "next/image";
import TrackPlayer from "./TrackPlayer";
import { FlowerGlyph } from "./Glyph";
import type { Album } from "@/content/site";

/**
 * A library album. The doc's idea: "when you click on the cover, have a track
 * play, and have the cover expand into a short description … and the links for
 * US and non-US".
 *
 * Cover art has not been sent yet, so a cover-less album shows a titled tile of
 * the same square proportion — the layout is final, only the image is pending.
 */
export default function AlbumCard({ album }: { album: Album }) {
  const [open, setOpen] = useState(false);
  const panelId = `album-${album.slug}`;

  return (
    <li className="w-full">
      <button
        type="button"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group block w-full text-left focus-visible:outline-none"
      >
        <div className="relative aspect-square w-full overflow-hidden border border-cream/15 bg-black/40 transition-colors duration-200 group-hover:border-cream/40 group-focus-visible:border-accent">
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

        <h2 className="mt-4 text-lg tracking-[0.12em] text-cream transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent sm:text-xl">
          {album.title}
        </h2>
        <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-cream/40">
          {open ? "Close" : "Details and licensing"}
        </span>
      </button>

      <div id={panelId} hidden={!open} className="mt-5 space-y-5">
        <p className="text-sm leading-relaxed text-cream/80 sm:text-base">
          {album.description}
        </p>

        {album.track ? (
          <TrackPlayer {...album.track} />
        ) : null}

        <ul className="space-y-2">
          {album.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm tracking-[0.1em] text-cream/80 underline decoration-cream/25 underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent focus-visible:text-accent focus-visible:outline-none"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
