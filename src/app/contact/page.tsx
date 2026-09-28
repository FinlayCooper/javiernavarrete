import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import Prose from "@/components/Prose";
import { FlowerGlyph } from "@/components/Glyph";
import { contactEmail, getSection, siteName } from "@/content/site";

export const metadata: Metadata = {
  title: `${getSection("contact").label} — ${siteName}`,
};

export default function ContactPage() {
  return (
    <SectionPage slug="contact">
      <Prose>
        <p className="text-center text-base leading-relaxed text-cream/70 sm:text-lg">
          For all inquiries, contact
        </p>
        <p className="mt-4 text-center">
          <a
            href={`mailto:${contactEmail}`}
            className="break-all text-xl tracking-[0.08em] text-cream underline decoration-cream/25 underline-offset-8 transition-colors duration-200 hover:text-accent hover:decoration-accent focus-visible:text-accent focus-visible:outline-none sm:text-2xl"
          >
            {contactEmail}
          </a>
        </p>

        <FlowerGlyph className="mx-auto mt-16 text-cream/25" size={22} />
      </Prose>
    </SectionPage>
  );
}
