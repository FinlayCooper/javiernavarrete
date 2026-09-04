import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import { getSection, siteName } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("opera").label} — ${siteName}`,
};

export default function OperaPage() {
  return <SectionPage slug="opera" />;
}
