import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import Prose from "@/components/Prose";
import AlbumCard from "@/components/AlbumCard";
import { albums, getSection, siteName } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("library").label} — ${siteName}`,
  description: `Production music albums by ${siteName}, licensable for film, advertising and games.`,
};

export default function LibraryPage() {
  return (
    <SectionPage slug="library">
      <Prose>
        <p className="mx-auto max-w-xl text-center text-base leading-relaxed text-cream/70 sm:text-lg">
          Two albums written outside of any film, available to license for
          advertising, games and screen.
        </p>

        <ul className="mt-14 grid grid-cols-1 items-start gap-14 sm:grid-cols-2 sm:gap-10">
          {albums.map((album) => (
            <AlbumCard key={album.slug} album={album} />
          ))}
        </ul>
      </Prose>
    </SectionPage>
  );
}
