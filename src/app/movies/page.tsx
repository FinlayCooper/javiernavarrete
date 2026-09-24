import type { Metadata } from "next";
import Image from "next/image";
import SectionPage from "@/components/SectionPage";
import Prose from "@/components/Prose";
import TrackPlayer from "@/components/TrackPlayer";
import { films, getSection, siteName } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("movies").label} — ${siteName}`,
  description: `Film and series scores by ${siteName}.`,
};

/**
 * Per the content doc: "single file scroll down with one poster per row, and its
 * title below the poster along with the player … no additional info about the
 * movie needed".
 */
export default function MoviesPage() {
  return (
    <SectionPage slug="movies">
      <Prose>
        <ul className="flex flex-col items-center gap-20 sm:gap-28">
          {films.map((film) => (
            <li key={film.slug} className="w-full max-w-[22rem]">
              <Image
                src={film.poster.src}
                alt={`${film.title} poster`}
                width={film.poster.width}
                height={film.poster.height}
                sizes="(max-width: 640px) 88vw, 352px"
                className="h-auto w-full"
              />

              <h2 className="mt-5 text-center text-lg tracking-[0.12em] text-cream sm:text-xl">
                {film.title}
              </h2>

              {film.track ? (
                <div className="mt-4">
                  <TrackPlayer {...film.track} />
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </Prose>
    </SectionPage>
  );
}
