import type { Metadata } from "next";
import Image from "next/image";
import SectionPage from "@/components/SectionPage";
import Prose from "@/components/Prose";
import { FlowerGlyph } from "@/components/Glyph";
import { aboutPhoto, bio, getSection, siteName } from "@/content/site";

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

        {aboutPhoto ? (
          <figure className="mx-auto mt-16 max-w-md">
            <Image
              src={aboutPhoto.src}
              alt={aboutPhoto.alt}
              width={aboutPhoto.width}
              height={aboutPhoto.height}
              sizes="(max-width: 640px) 88vw, 448px"
              className="h-auto w-full"
            />
            <figcaption className="mt-3 text-center text-xs tracking-[0.12em] text-cream/45">
              Photograph by {aboutPhoto.photographer}
            </figcaption>
          </figure>
        ) : null}

        <FlowerGlyph className="mx-auto mt-16 text-cream/25" size={22} />
      </Prose>
    </SectionPage>
  );
}
