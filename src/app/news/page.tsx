import type { Metadata } from "next";
import Image from "next/image";
import SectionPage from "@/components/SectionPage";
import Prose from "@/components/Prose";
import RichText from "@/components/RichText";
import { FlowerGlyph } from "@/components/Glyph";
import { linkClass } from "@/components/linkClass";
import { getSection, newsPosts, siteName } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("news").label} — ${siteName}`,
};

/**
 * Each post: title, then its image (the client suggested "after 20th
 * anniversary title"), the copy, and any streaming links. Posts live in
 * `newsPosts` in src/content/site.ts.
 */
export default function NewsPage() {
  return (
    <SectionPage slug="news">
      <Prose>
        {newsPosts.length === 0 ? (
          <p className="text-center text-lg tracking-[0.12em] text-cream/40">
            Nothing posted yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-24">
            {newsPosts.map((post) => (
              <li key={post.id}>
                <article>
                  {post.date ? (
                    <time
                      dateTime={post.date}
                      className="block text-center text-sm tracking-[0.18em] text-cream/40"
                    >
                      {post.date}
                    </time>
                  ) : null}
                  <h2 className="mt-3 text-center text-2xl tracking-[0.06em] text-cream text-balance sm:text-3xl">
                    {post.title}
                  </h2>

                  {post.image ? (
                    <Image
                      src={post.image.src}
                      alt={post.image.alt}
                      width={post.image.width}
                      height={post.image.height}
                      sizes="(max-width: 640px) 88vw, 384px"
                      className="mx-auto mt-10 h-auto w-full max-w-sm"
                    />
                  ) : null}

                  <div className="mt-10 space-y-6 text-base leading-relaxed text-cream/85 sm:text-lg sm:leading-relaxed">
                    {post.body.map((paragraph, i) => (
                      <RichText key={i} paragraph={paragraph} />
                    ))}
                  </div>

                  {post.listen?.length ? (
                    <div className="mt-10 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-3 text-sm sm:text-base">
                      <span className="italic text-cream/45">Stream the score</span>
                      {post.listen.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`Stream the score on ${link.label}`}
                          className={linkClass}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        )}

        <FlowerGlyph className="mx-auto mt-16 text-cream/25" size={22} />
      </Prose>
    </SectionPage>
  );
}
