import type { Metadata } from "next";
import { Cormorant } from "next/font/google";
import "./globals.css";
import { siteName } from "@/content/site";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: siteName,
  description: `${siteName} — composer for film, opera and stage.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Browser extensions stamp attributes on <html> before hydration; this only
    // silences mismatches on this one element, not its children.
    <html
      lang="en"
      className={`${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-display">{children}</body>
    </html>
  );
}
