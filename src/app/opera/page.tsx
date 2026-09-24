import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import Prose from "@/components/Prose";
import OperaCarousel from "@/components/OperaCarousel";
import { FlowerGlyph } from "@/components/Glyph";
import { getSection, operaPhotos, operaText, siteName } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("opera").label} — ${siteName}`,
  description: `Los Amantes, an opera by ${siteName} on the legend of the Lovers of Teruel.`,
};

/** Per the content doc: the carousel, then Plot, Production and Tradition beneath it. */
export default function OperaPage() {
  return (
    <SectionPage slug="opera">
      <OperaCarousel photos={operaPhotos} />

      <Prose>
        <h2 className="text-center text-2xl tracking-[0.12em] text-cream sm:text-3xl">
          Los Amantes
        </h2>

        <div className="mt-14 space-y-14">
          {operaText.map((section) => (
            <section key={section.heading}>
              <h3 className="text-center text-sm uppercase tracking-[0.24em] text-cream/50">
                {section.heading}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-cream/85 sm:text-lg sm:leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <FlowerGlyph className="mx-auto mt-16 text-cream/25" size={22} />
      </Prose>
    </SectionPage>
  );
}
