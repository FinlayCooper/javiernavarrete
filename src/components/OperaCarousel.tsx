"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { OperaPhoto } from "@/content/site";

/**
 * The doc asks for the opera photos "displayed in a large format carousel".
 *
 * Built on a scroll-snap strip rather than transforms, so swiping on a phone and
 * trackpad scrolling are native; the arrows, dots and keyboard just scroll the
 * strip, and the current index is read back from its scroll position.
 */
export default function OperaCarousel({ photos }: { photos: OperaPhoto[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function onScroll() {
      if (!track) return;
      setIndex(Math.round(track.scrollLeft / track.clientWidth));
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  function goTo(next: number) {
    const track = trackRef.current;
    if (!track) return;
    const wrapped = (next + photos.length) % photos.length;
    track.scrollTo({ left: wrapped * track.clientWidth, behavior: "smooth" });
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  }

  const arrow =
    "absolute top-1/2 z-10 hidden -translate-y-1/2 p-3 text-cream/70 transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none sm:block";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Los Amantes, photographs"
      className="border-t border-cream/10 bg-ground py-12 sm:py-16"
    >
      <div className="relative mx-auto max-w-6xl sm:px-16">
        <div
          ref={trackRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${photos.length}`}
              className="relative aspect-[3/2] w-full shrink-0 snap-center"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, 1024px"
                loading={i === 0 ? "eager" : "lazy"}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous photo"
          className={`${arrow} left-1`}
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 4l-8 8 8 8" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next photo"
          className={`${arrow} right-1`}
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 4l8 8-8 8" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-1">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
            className="group p-1.5 focus-visible:outline-none"
          >
            <span
              className={`block h-1.5 w-1.5 rounded-full transition-colors duration-200 group-hover:bg-accent group-focus-visible:bg-accent ${
                i === index ? "bg-cream" : "bg-cream/25"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
