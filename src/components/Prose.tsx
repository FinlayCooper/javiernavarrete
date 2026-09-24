/**
 * The band below a section's hero. Matches Footer's frame so the two stack as
 * one continuous column once you scroll past the painting.
 */
type Props = {
  children: React.ReactNode;
  /** Widen for the poster column on /movies. */
  className?: string;
};

export default function Prose({ children, className }: Props) {
  return (
    <section
      className={`border-t border-cream/10 bg-ground px-6 py-16 sm:py-20 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-3xl">{children}</div>
    </section>
  );
}
