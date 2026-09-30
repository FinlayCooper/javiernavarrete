import { linkClass } from "./linkClass";
import type { Paragraph } from "@/content/site";

/** One paragraph of copy, with any linked phrases opening in a new tab. */
export default function RichText({ paragraph }: { paragraph: Paragraph }) {
  const parts = typeof paragraph === "string" ? [paragraph] : paragraph;
  return (
    <p>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <a
            key={i}
            href={part.href}
            target="_blank"
            rel="noreferrer noopener"
            className={linkClass}
          >
            {part.text}
          </a>
        ),
      )}
    </p>
  );
}
