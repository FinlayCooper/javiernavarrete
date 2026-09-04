import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import { getSection, newsPosts, siteName } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("news").label} — ${siteName}`,
};

/**
 * Reads from `newsPosts`, which is empty until the admin UI can write to it.
 * Wiring that up is a change to src/content/site.ts, not to this page.
 */
export default function NewsPage() {
  return (
    <SectionPage slug="news">
      <div className="mx-auto w-full max-w-3xl px-6 py-20">
        {newsPosts.length === 0 ? (
          <p className="text-center text-lg tracking-[0.12em] text-cream/40">
            Nothing posted yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-14">
            {newsPosts.map((post) => (
              <li key={post.id}>
                <article>
                  <time
                    dateTime={post.date}
                    className="text-sm tracking-[0.18em] text-cream/40"
                  >
                    {post.date}
                  </time>
                  <h2 className="mt-3 text-3xl tracking-[0.04em] text-cream">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-cream/70">
                    {post.body}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionPage>
  );
}
