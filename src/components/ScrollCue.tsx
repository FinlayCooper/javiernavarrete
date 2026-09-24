"use client";

import { useEffect, useState } from "react";
import { FlowerGlyph } from "./Glyph";

/**
 * "The thread": the rosette with a hairline hanging from it off the bottom of
 * the painting, a brighter segment slowly running down it and over the fold —
 * it lands on the content band's top border, so the painting and the page read
 * as one strand. Fades away once the visitor has started scrolling.
 */
export default function ScrollCue() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      aria-label="Scroll to content"
      tabIndex={scrolled ? -1 : 0}
      className={`group absolute bottom-0 left-1/2 z-20 flex h-[4.5%] min-h-9 w-10 -translate-x-1/2 flex-col items-center pt-1 transition-opacity duration-500 focus-visible:outline-none ${
        scrolled ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <FlowerGlyph
        size={11}
        className="shrink-0 text-cream/60 transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent"
      />
      <span
        aria-hidden
        className="relative mt-1.5 w-px flex-1 overflow-hidden bg-cream/20"
      >
        <span className="thread-pulse absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-cream to-transparent group-hover:via-accent" />
      </span>
    </button>
  );
}
