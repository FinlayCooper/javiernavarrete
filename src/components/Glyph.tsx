/**
 * The two small gold marks from the content doc's General/Visual tab — the
 * client kept them from an earlier site and asked for "a few" around the place.
 * Redrawn as SVG rather than lifted as bitmaps so they take the cream colour and
 * stay crisp at any size.
 */

type Props = {
  /** Rendered size in px; both glyphs are square. */
  size?: number;
  className?: string;
};

/** Double-headed arrow crossed by two bars. Used as the "back home" mark. */
export function ArrowGlyph({ size = 28, className }: Props) {
  return (
    <svg
      viewBox="0 0 56 40"
      width={(size * 56) / 40}
      height={size}
      aria-hidden
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h48" />
      <path d="M15 9L4 20l11 11" />
      <path d="M45 13.5L51.5 20 45 26.5" />
      <path d="M29 8.5v23M38 11v18" />
    </svg>
  );
}

/** Five-petal rosette. */
export function FlowerGlyph({ size = 20, className }: Props) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden
      focusable="false"
      className={className}
      fill="currentColor"
    >
      {petals.map((deg) => (
        <ellipse
          key={deg}
          cx="24"
          cy="14.5"
          rx="4.6"
          ry="8.6"
          transform={`rotate(${deg} 24 24)`}
        />
      ))}
    </svg>
  );
}
