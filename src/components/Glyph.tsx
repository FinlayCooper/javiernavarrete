/**
 * The two small gold marks from the content doc's General/Visual tab — the
 * client kept them from an earlier site and asked for "a few" around the place.
 * Redrawn as SVG rather than lifted as bitmaps so they take the theme's gold
 * (`text-accent`) and stay crisp at any size.
 */

type Props = {
  /** Rendered size in px; both glyphs are square. */
  size?: number;
  className?: string;
};

/**
 * Left-pointing arrow with a feathered tail, crossed by one bar — traced from
 * the client's gold icon. Used as the "back home" mark and, mirrored, as the
 * carousel's "next" arrow.
 */
export function ArrowGlyph({ size = 28, className }: Props) {
  return (
    <svg
      viewBox="-6 -6 160 84"
      width={(size * 160) / 84}
      height={size}
      aria-hidden
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 36h122" />
      <path d="M40 4L2 36l38 32" />
      <path d="M148 6l-24 30 24 30" />
      <path d="M80 2v68" strokeWidth={10} />
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
