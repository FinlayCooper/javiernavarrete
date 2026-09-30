import type { Metadata } from "next";
import Image from "next/image";
import SectionPage from "@/components/SectionPage";
import Prose from "@/components/Prose";
import TrackPlayer from "@/components/TrackPlayer";
import { linkClass } from "@/components/linkClass";
import { films, getSection, siteName } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("movies").label} — ${siteName}`,
  description: `Film and series scores by ${siteName}.`,
};

/**
 * Per the content doc: "single file scroll down with one poster per row, and its
 * title below the poster along with the player … no additional info about the
 * movie needed". A "Keep Listening" link to the score's album sits under the
 * player where one is available (added in the second round of feedback).
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

              {film.album ? (
                <p className="mt-3 text-center text-sm sm:text-base">
                  <a
                    href={film.album}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Keep listening to the ${film.title} score on Spotify`}
                    className={linkClass}
                  >
                    Keep Listening
                  </a>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </Prose>
    </SectionPage>
  );
}
