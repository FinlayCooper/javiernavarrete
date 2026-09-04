import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { coverImage, siteName } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero image={coverImage} title={siteName.toUpperCase()} />
      <Footer />
    </>
  );
}
