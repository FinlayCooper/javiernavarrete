import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import Prose from "@/components/Prose";
import { FlowerGlyph } from "@/components/Glyph";
import { bio, getSection, siteName } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("about").label} — ${siteName}`,
  description: bio[0],
};

export default function AboutPage() {
  return (
    <SectionPage slug="about">
      <Prose>
        <div className="space-y-6 text-base leading-relaxed text-cream/85 sm:text-lg sm:leading-relaxed">
          {bio.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <FlowerGlyph className="mx-auto mt-16 text-cream/25" size={22} />
      </Prose>
    </SectionPage>
  );
}
