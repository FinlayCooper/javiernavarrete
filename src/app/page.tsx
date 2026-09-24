import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { coverImage } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero image={coverImage} />
      <Footer />
    </>
  );
}
