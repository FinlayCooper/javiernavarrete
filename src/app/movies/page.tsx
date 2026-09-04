import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import { getSection, siteName } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("movies").label} — ${siteName}`,
};

export default function MoviesPage() {
  return <SectionPage slug="movies" />;
}
