import Hero from "./Hero";
import Footer from "./Footer";
import { getSection } from "@/content/site";

type Props = {
  slug: string;
  /** The section’s content band, rendered between the hero and the footer. */
  children?: React.ReactNode;
};

export default function SectionPage({ slug, children }: Props) {
  const section = getSection(slug);

  return (
    <>
      <Hero
        image={section.image}
        currentSlug={section.slug}
        fadeIn
        showScrollCue={Boolean(children)}
      />
      {children}
      <Footer showHomeLink />
    </>
  );
}
