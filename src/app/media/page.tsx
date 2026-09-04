import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import { getSection, siteName } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("media").label} — ${siteName}`,
};

export default function MediaPage() {
  return <SectionPage slug="media" />;
}
