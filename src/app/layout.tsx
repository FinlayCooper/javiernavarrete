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
    <html lang="en" className={`${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-display">{children}</body>
    </html>
  );
}
