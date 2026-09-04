import Hero from "./Hero";
import Footer from "./Footer";
import { getSection } from "@/content/site";

type Props = {
  slug: string;
  /** Placeholder body copy; the real content lands in a later round. */
  children?: React.ReactNode;
};

export default function SectionPage({ slug, children }: Props) {
  const section = getSection(slug);

  return (
    <>
      <Hero
        image={section.image}
        title={section.label}
        currentSlug={section.slug}
      />
      {children}
      <Footer />
    </>
  );
}
