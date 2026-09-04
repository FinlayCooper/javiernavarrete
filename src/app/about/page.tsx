import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import { getSection, siteName } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("about").label} — ${siteName}`,
};

export default function AboutPage() {
  return <SectionPage slug="about" />;
}
