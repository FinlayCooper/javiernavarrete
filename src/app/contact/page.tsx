import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import { getSection, siteName } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("contact").label} — ${siteName}`,
};

export default function ContactPage() {
  return <SectionPage slug="contact" />;
}
