import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import { getSection, siteName } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("library").label} — ${siteName}`,
};

export default function LibraryPage() {
  return <SectionPage slug="library" />;
}
